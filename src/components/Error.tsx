export const Error = ({ error }: { error: string }) => {
    return (
        <div>
            <span>Error :/</span>
            <span>Something went wrong</span>
            <span>{error}</span>
        </div>
    )
}