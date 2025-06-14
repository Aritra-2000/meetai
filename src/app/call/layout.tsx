interface Props{
    children: React.ReactNode;
}

const LayOut = ({ children }: Props) =>{
    return (
        <div className="h-screen bg-black">
          {children}
        </div>
    )
}

export default LayOut;