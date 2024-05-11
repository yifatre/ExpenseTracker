import spinner from './../assets/img/Spinner.svg'

export function Loader() {
    return <div className='loader-backdrop'>
        <img src={spinner} alt="" />
    </div>
}