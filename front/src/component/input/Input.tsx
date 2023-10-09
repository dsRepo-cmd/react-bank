import React, { useCallback, useState } from 'react'
import cl from './Input.module.css'
import eyeIco from './svg/eye.svg'
import eyeHideIco from './svg/eye-hide.svg'
import eyeErrIco from './svg/eye-error.svg'
import eyeErrHideIco from './svg/eye-error-hide.svg'

interface InputProps {
  label?: string
  placeholder: string
  password?: boolean
  name?: string
  error?: string
  onChange?: (value: string) => void
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  password = false,
  name,
  error,
  onChange,
}) => {
  const [isHide, setHide] = useState(password)

  const handleEye = () => {
    setHide(!isHide)
  }

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      if (onChange) onChange(newValue)
    },
    [onChange],
  )

  const inputClass = `${cl.input} ${
    error && error.length > 1 ? cl.input__error : ''
  }`
  const labelClass = `${cl.label} ${
    error && error.length > 1 ? cl.label__error : ''
  }`
  const icon = isHide
    ? error
      ? eyeErrHideIco
      : eyeHideIco
    : error
    ? eyeErrIco
    : eyeIco

  return (
    <div className={cl.field}>
      {label && <div className={labelClass}>{label}</div>}

      <div className={cl.wrapper}>
        <input
          name={name}
          onInput={handleChange}
          className={inputClass}
          placeholder={placeholder}
          type={isHide ? 'password' : 'text'}
        />

        {password && (
          <img
            onClick={handleEye}
            className={cl.icon}
            src={icon}
            alt="eye"
          />
        )}
      </div>

      {error && <span className={cl.alert}>{error}</span>}
    </div>
  )
}

export default Input
