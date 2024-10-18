"use client"

import UrlList from "./url-list";
import React, { useState } from "react";
import ShortenForm from "./shorten-form";

export default function UrlShortenerContainer() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleUrlShortened = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div>
            <ShortenForm handleUrlShortened={handleUrlShortened} />
            <UrlList key={refreshKey} />
        </div>
    )
}