import React from 'react';
import {useField, FieldHookConfig, Field, ErrorMessage} from "formik";

import {TextFieldProps} from "@/pages/components/TextField/text-field.props";


function TextField({ ...props }:TextFieldProps & FieldHookConfig<string>) {
    const [field, meta, helpers] = useField(props)


    return (
        <div className={'mb-1 inline-block w-full'}>
            <label className={`inline-block w-full ${meta.error && meta.touched && 'border-2 border-red-500'}`}>
                <Field {...props} className={'input text-slate-100'} />
            </label>

            {meta.error && meta.touched && <p className={'text-red-500 text-xl'}><ErrorMessage name={field.name} /></p>}
        </div>
    )
}

export default TextField

