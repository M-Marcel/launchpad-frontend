

const List = ({h1, p, p1, p2, p3, link1, link2, link3, soon,sooner, link4}) => {
    return (
        <div>
            <p className='font-semibold mb-4 text-xl lg:text-2xl'>{h1}</p>
            <a href={link1} className='hover:text-[white] text-[#e0eeffc9]  mb-2 block'>{p}{sooner && <sup className="text-[red] ml-1 text-[14px]">{sooner}</sup>} </a>
            <a href={link2}  className='hover:text-[white] text-[#e0eeffc9]  mb-2 block'>{p1}</a>
            <a href={link3} className=' hover:text-[white] text-[#e0eeffc9]  mb-2 block'>{p2} {soon && <sup className="text-[red] text-[14px]">{soon}</sup>} </a>
            <a href={link4} className=' hover:text-[white] text-[#e0eeffc9]  block'>{p3}</a>
        </div>
    )
}


export default List