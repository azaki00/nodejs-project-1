import React from 'react'

export const FormField = ({ props }) => {
    return (
        <>
            <div className='form-group'>
                <label>
                    {props.label}
                </label>
                <input className="form-control-input" type={props.input.type} {...props.input.required ? required : ""} placeholder={props.input.placeholder}>

                </input>
            </div>
        </>
    )
}
