import React, {useContext, useEffect} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import MainController from "@src/MainController";
import {AppContext} from "@src/main";
import {NftHistoryEvent} from "@harvest-flow/utils";
import {formatTimestampForHistoryTable} from "@src/utils";

const NftHistory = () => {
    const mainController: MainController = useContext(AppContext);

    const [nftHistory, setNftHistory] = React.useState<NftHistoryEvent[]>([]);

    useEffect(() => {
        mainController.getNftHistoryForUser().then((response) => {
            if(response.history) {
                setNftHistory(response.history);
            }
        });
    },[]);

    return (
        <TableContainer component={Paper} elevation={2}>
            <Typography variant="h6" gutterBottom component="div" style={{ padding: 16 }}>
                Project History
            </Typography>

             <Table aria-label="simple table" className={"borderAll"} sx={{
                    margin: "5px",
                    width: "calc(100% - 10px)",
                    height: "200px",
            }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell>Project</TableCell>
                        <TableCell>Tx</TableCell>
                        <TableCell>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {nftHistory.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row" >
                                {row.eventType}
                            </TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell>{row.projectName}</TableCell>
                            <TableCell>{row.transactionHash}</TableCell>
                            <TableCell>{formatTimestampForHistoryTable(row.timestamp)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default NftHistory;
