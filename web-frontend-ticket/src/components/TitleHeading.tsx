// file ini utk title di bagian heading
import React from "react";

// definisikan type untuk prop yaitu title
interface TitleHeadingProps {
    title: string
}

export default function TitleHeading({title}: TitleHeadingProps) {
    return (
        <div className="flex items-center">
            <h1 className="text-lg font-semibold m:text-2xl">{title}</h1>
        </div>
    )
}