import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from "yup"
import Card from '../../../../interfaces/general/card/Card';
import GridBody from '../../../../interfaces/general/grids/GridBody';
import Grid12 from '../../../../interfaces/general/grids/gridLength/Grid12';
import EditFooterButtons from '../../../../utilities/buttons/EditFooterButtons';
import TextInput from '../../../../utilities/inputs/TextInput';
import { strings } from '../../../../utilities/multiLanguage/LocalizedStrings';
import Service from '../../../../utilities/services/Service';

function DepartmentEdit(props) {

    let { departmentID } = useParams({});
    const getApiAddress = "/api/department/getbyid"
    const saveApiAdress = "/api/department/saveandflush"
    const [editable, setEditable] = useState(false);
    const initialValues = {
        departmentName: null
    }
    const validationSchema = Yup.object({
        departmentName: Yup.string().nullable().required(strings.utilities.validations.requiredField)
    })

    const form = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let service = new Service()
            service.saveAndFlushData(saveApiAdress, values)
                .then(response => {
                    if (response.data.success === true) {
                        toast.success(response.data.message)
                    } else {
                        toast.error(response.data.message)
                    }
                }).catch(response => {
                    toast.error(strings.utilities.responseMessages.procUnsuccess)
                }).finally(response => {
                    form.resetForm()
                    form.setSubmitting(false)
                    setEditable(false)
                })
        }
    })

    useEffect(() => {
        let service = new Service()
        service.getByIDData(getApiAddress, "departmentID", departmentID)
            .then(result => {
                if (result.data.success === true) {
                    form.setValues(result.data.data)
                } else {
                    toast.error(result.data.message)
                }
            });
    }, [departmentID, form.isSubmitting])

    const changeEdit = (value) => {
        setEditable(value)
    }

    const disable = (!form.dirty || form.isSubmitting || !form.isValid)

    return (
        <form onSubmit={form.handleSubmit}>
            <Card>
                <h5>{strings.admin.department.department.editPage.h5}</h5>
                <GridBody>
                    <Grid12>
                        <TextInput
                            value={form.values.departmentName}
                            label={strings.admin.department.department.editPage.placeholders.departmentName}
                            onChange={form.handleChange}
                            name='departmentName'
                            autoFocus
                            error={form.errors.departmentName}
                            disabled={!editable}
                        />
                    </Grid12>
                    
                    <EditFooterButtons editable={editable} disabled={disable} changeEdit={changeEdit} submit={form.handleSubmit} />
                </GridBody>
            </Card>
        </form>
    )
}


export default DepartmentEdit