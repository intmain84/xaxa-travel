function LocationsSkeleton() {
    return (
        <div>
            <ul className="grid grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <li
                        key={index}
                        className="animate-colorPulse h-[313px]"
                    ></li>
                ))}
            </ul>
        </div>
    )
}

export default LocationsSkeleton
