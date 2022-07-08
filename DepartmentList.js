import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Card from '../../../../interfaces/general/card/Card';
import { strings } from '../../../../utilities/multiLanguage/LocalizedStrings';
import Service from '../../../../utilities/services/Service';
import Table from '../../../../utilities/tables/Table';

function DepartmentList(props) {

    const [state, setState] = useState(0)
    const [loading, setLoading] = useState(true);

    const [department, setDepartment] = useState([]);
    const addLink = "department-add"
    const editLink = "department-edit"
    const deleteApiAddress = "/api/department/delete"
    const deleteName = "departmentName"
    const getApiAddress = "/api/department/getall"
    const columns = [
        { field: "departmentName", header: strings.admin.department.department.listPage.columns.departmentName },
    ]

    useEffect(() => {
        let service = new Service()
        service.getAllData(getApiAddress)
            .then(result => {
                if (result.data.success === true) {
                    setDepartment(result.data.data)
                } else {
                    toast.error(result.data.message)
                }
            }).catch(response => {
                toast.error(strings.utilities.responseMessages.listUnsuccess)
            }).finally(response => {
                setLoading(false)
            })
    }, [state]);

    const deleted = () => {
        setState((prevState) => { return prevState + 1 })
    }

    return (
        <Card>
            <Table
                loading={loading}
                values={department}
                columns={columns}
                id="departmentID"
                deleteApiAddress={deleteApiAddress}
                deleted={deleted}
                deleteName={deleteName}
                editLink={editLink}
                toolbarAddLink={addLink}
            />
        </Card>
    )
}

export default DepartmentList