interface HeartIconProp {
    isFilled: boolean;
}

export const HeartIcon = ({ isFilled }: HeartIconProp) => {
    return (
        isFilled ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#63d838" fill="#63d838" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#D1D5DB" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
        )
    )
} 