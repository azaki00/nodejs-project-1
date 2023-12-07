import React from 'react'

export const FormField = ({props}) => {
  return (
    <>
        <label>
            {props.label}
        </label>
        <input type={props.input.type} {...props.input.required? required:""} placeholder={props.input.placeholder}>
            
        </input>
    </>
  )
}
