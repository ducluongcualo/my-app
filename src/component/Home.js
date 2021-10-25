import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import productApi from '../api/productApi'
import ReactPaginate from 'react-paginate'
export default function Home() {

    // cac state
    const [apiData, setApidata] = useState([])
    const [pages, setPages] = useState(null)
    const [page, setPage] = useState(null)


    // get api lan dau tien
    const getApi = async () => {
        const response = await productApi.getAll();
        setApidata(response.data)
        setPages(response.meta.pagination.pages)
        setPage(response.meta.pagination.page)
    }

    // render 
    useEffect(() => {
        getApi();
        getFetchApi()
        if (!handleChange) {
            getSearchApi()
        }
    }, [])

    // ham xoa phan tu
    const handleDelete = (id) => {
        try {
            productApi.delete(id)
            getApi();
        }
        catch (errors) {
            console.log(errors)
        }
    }

    // lay gia tri cua phan tu
    const getData = (data) => {
        localStorage.setItem('item', JSON.stringify(data))
    }

    // goi api xu li phan trang
    const getFetchApi = async (page) => {
        const response = await productApi.get(page)
        console.log("fetch api", response.data)
        setApidata(response.data)
        setPages(response.meta.pagination.pages)
        setPage(response.meta.pagination.page)
    }

    // xu li phan trang click
    const handlePageClick = (data) => {
        let page = data.selected + 1
        getFetchApi(page)
    }

    // xu li api tim kiem
    const getSearchApi = async (value) => {
        const response = await productApi.search(value)
        console.log("search api", response)
        setApidata(response.data)
        setPages(response.meta.pagination.pages)
        setPage(response.meta.pagination.page)
    }

    const handleChange = (e) => {
        e.preventDefault();
        let value = e.target.value.toLowerCase();
        console.log(value)
        getSearchApi(value)
    }
    return (
        <div>
            <div className="container">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-0 col-md-4">
                                    <h2>Manage <b>Employees</b></h2>
                                </div>
                                <div className="col-sm-6 col-md-4">
                                    <div class="input-group">
                                        <div class="form-outline">
                                            <input type="search" onChange={handleChange} placeholder="Search" id="form1" class="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-4">
                                    <Link to='/add' className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></Link>
                                    {/* <a href className="btn btn-danger" data-toggle="modal" ><i className="material-icons">&#xE15C;</i> <span>Delete</span></a> */}
                                </div>
                            </div>
                        </div>

                        <table className="table table-striped table-hover">

                            <thead>
                                <tr>
                                    {/* <th>
                                        <span className="custom-checkbox">
                                            <input type="checkbox" id="selectAll" ></input>
                                            <label htmlFor="selectAll"></label>
                                        </span>
                                    </th> */}
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    apiData.map((user, key) => {
                                        return (
                                            <tr key={key}>
                                                {/* <td>
                                                    <span className="custom-checkbox">
                                                        <input type="checkbox" id="checkbox1" name="options[]" value="1"></input>
                                                        <label for="checkbox1"></label>
                                                    </span>
                                                </td> */}
                                                <td>{user.id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.gender}</td>
                                                <td>{user.status}</td>
                                                <td>
                                                    <Link className="edit" to="/edit" data-toggle="modal" onClick={() => getData(user)} >   <i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></Link>
                                                    <Link className="delete" to='' onClick={() => handleDelete(user.id)} ><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </table>
                        <div className="clearfix">
                            <div className="hint-text">Showing <b>{page}</b> out of <b>{pages}</b> entries</div>
                            <ReactPaginate
                                previousLabel={'Prev'}
                                nextLabel={'Next'}
                                pageCount={pages}
                                breakLabel={'...'}
                                containerClassName={'pagination'}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={3}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                activeClassName={'active'}
                                onPageChange={handlePageClick}
                            />
                        </div>
                    </div>
                </div >
            </div >
        </div>
    )
}
