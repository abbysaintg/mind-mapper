function Edge({ edge }) {
    return (
        <div className="edge">
            {edge?.source}
            {edge?.target}
        </div>
    )
}

export default Edge
