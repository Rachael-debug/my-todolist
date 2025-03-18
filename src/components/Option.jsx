export default function Option({value, ...props}){
    return(
        <option value={value} {...props}>{value}</option>
    )
}