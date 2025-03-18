export default function TodoInput({name, label, type, ...props}){
    return(
        <p>
            <label htmlFor={name}>{label}</label><br/>
            <input type={type} id={name}name={name} {...props}/>
        </p>
    )
}