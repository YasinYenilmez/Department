import { useFormik } from 'formik'
import { Button } from 'primereact/button'
import React from 'react'
import { toast } from 'react-toastify'
import * as Yup from "yup"
import Card from '../../../../interfaces/general/card/Card'
import GridBody from '../../../../interfaces/general/grids/GridBody'
import Grid2 from '../../../../interfaces/general/grids/gridLength/Grid2'
import Grid12 from '../../../../interfaces/general/grids/gridLength/Grid12'
import TextInput from '../../../../utilities/inputs/TextInput'
import { strings } from '../../../../utilities/multiLanguage/LocalizedStrings'
import Service from '../../../../utilities/services/Service'

function DepartmentAdd(props) {

    const apiAdress = "/api/department/saveandflush"
    const initialValues = {
        departmentName: null,
    }
    const validationSchema = Yup.object({
        departmentName: Yup.string().nullable().required(strings.utilities.validations.requiredField),
        })

    const form = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let service = new Service()
            service.saveAndFlushData(apiAdress, values)
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
                })
        }
    })
    return (
        <form onSubmit={form.handleSubmit}>
            <Card>
                <h5>{strings.admin.department.department.addPage.h5}</h5>
                <GridBody>
                    <Grid12>
                        <TextInput
                            value={form.values.departmentName}
                            label={strings.admin.department.department.addPage.placeholders.departmentName}
                            onChange={form.handleChange}
                            name='departmentName'
                            autoFocus
                            error={form.errors.departmentName}
                        />
                    </Grid12>
                    
                    <Grid2>
                        <Button disabled={!form.dirty || form.isSubmitting || !form.isValid}
                            type='submit' label={strings.utilities.buttons.save} />
                    </Grid2>
                </GridBody>
            </Card>
        </form>
    )
}

export default DepartmentAdd