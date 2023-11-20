import {CopyAllTwoTone} from "@mui/icons-material";
import {Typography} from "@mui/material";
import {Button} from "@radix-ui/themes";

export const InfoCard = ({info}) => {
    return (
        <div className="text-center mb-2 p-2 p-lg-3 rounded-3 shadow-sm card">
            <div className="d-flex align-items-center justify-content-between">
                <h5 className=" text-capitalize">{info?.title}</h5>
                <Button
                    variant="surface"
                    onClick={(e) => {
                        navigator.clipboard.writeText(info.body);
                        e.currentTarget.classList.add("bg-success", "text-white");
                    }}>
                    <CopyAllTwoTone /> Copy
                </Button>
            </div>
            <div className="d-flex justify-content-center">
                <Typography id="content1-1" className="m-auto">
                    {info?.body}
                </Typography>
            </div>
        </div>
    );
};