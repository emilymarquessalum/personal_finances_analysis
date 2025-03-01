'use client';

import { Button, Typography } from "@mui/material";
import { NavBody } from "../../layout/nav/nav-body";
import { GitHub, MonetizationOn } from "@mui/icons-material";
import Image from "next/image";
import { ProjectMetadata } from "../../metadata";

export default function Page() {

    // change later to new one
    const linkToGithub : string = "https://github.com/emilymarquessalum/personal_finances_analysis";

    const linkToPatreon : string | null = null;

    return (
        <NavBody children={
            <div className="p-8 max-w-3xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <Typography variant="h2" className="font-bold">
                        {ProjectMetadata.name}
                    </Typography>
                    <Typography variant="h5" className="text-gray-600">
                        A simple way to manage your personal finances
                    </Typography>
                </div>

                <div className="flex justify-center space-x-4">
                   {
                   linkToPatreon &&
                   <Button
                        variant="contained"
                        startIcon={<MonetizationOn />}
                        onClick={() => window.open(linkToPatreon!, '_blank')}
                        className="bg-[#FF424D] hover:bg-[#FF424D]/90"
                    >
                        Support on Patreon
                    </Button>}
                    <Button
                        variant="contained"
                        startIcon={<GitHub />}
                        onClick={() => window.open(linkToGithub, '_blank')}
                        className="bg-[#24292E] hover:bg-[#24292E]/90"
                    >
                        View on GitHub
                    </Button>
                </div>

                <div className="space-y-4 text-center">
                    <Typography variant="body1" className="text-gray-700">
                        This application was created to help people manage their personal finances 
                        in a simple and effective way. Track your income, expenses, and see your 
                        financial progress over time.
                    </Typography>

                    <Typography variant="body1" className="text-gray-700">
                        The project is open source and free to use. If you find it helpful, 
                        consider supporting its development through Patreon. Your support helps 
                        maintain and improve the application.
                    </Typography>
                </div>
            </div>
        } />
    );
}