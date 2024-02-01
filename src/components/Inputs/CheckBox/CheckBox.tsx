import React, { forwardRef } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { Column } from '../../ComponentAlignment'
import { Label } from '../../Common'

type TextProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  id?: string
  label?: string
  error?: string
}
export const CheckBox = forwardRef<HTMLInputElement, TextProps>(
  ({ label, id = `textInput-${uuidV4()}`, error, ...rest }: TextProps, ref) => {
    return (
      <Column>
        <Label id={id} text={label} />
        <div className="inline-flex items-center">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="customStyle">
            <input
              type="checkbox"
              className="before:content[''] before:bg-blue-gray-500 peer relative h-8 w-8 cursor-pointer appearance-none rounded-full border border-yellow-300 bg-gray-900/10 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-violet-500 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
              id={id}
              ref={ref}
              {...rest}
            />
          </label>
        </div>
        <span>{error}</span>
      </Column>
    )
  }
)

CheckBox.displayName = 'CheckBox'

// import { CheckBoxIcon } from '../../Icons/CheckBoxIcon/CheckBoxIcon'

// type CheckBoxType = {
//   id?: string
//   label?: string
//   error?: string
//   defaultChecked?: boolean
//   onChange: (checked: boolean) => void
// }
// export const CheckBox = ({
//   label,
//   id = `textInput-${uuidV4()}`,
//   error,
//   defaultChecked,
//   onChange
// }: CheckBoxType) => {
//   const [checked, setChecked] = useState<boolean>(!!defaultChecked)

//   const handleOnCHange = () => {
//     setChecked((current) => !current)
//   }

//   useEffect(() => {
//     onChange(checked)
//   }, [checked, onChange])

//   return (
//     <Column>
//       <label htmlFor={id}>{label}</label>
//       {<CheckBoxIcon id={id} checked={checked} onClick={handleOnCHange} />}
//       <span>{error}</span>
//     </Column>
//   )
// }

// CheckBox.displayName = 'CheckBox'
