import React, {useContext, useEffect} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import MainController from "@src/MainController";
import {AppContext} from "@src/main";
import {NftHistoryEvent} from "@harvest-flow/utils";
import {formatTimestampForHistoryTable, middleEllipsis} from "@src/utils";
import {CHAIN_EXPLORER_URI} from "@src/utils/constants";
import {ethers} from "ethers";

interface NftHistoryProps {
    contractAddress? : string;
}

const NftHistory : React.FC<NftHistoryProps> = ({contractAddress}) => {
    const isProjectHistory = contractAddress !== undefined;
    const mainController: MainController = useContext(AppContext);

    const [nftHistory, setNftHistory] = React.useState<NftHistoryEvent[]>([]);

    useEffect(() => {
        if(isProjectHistory) {
            mainController.getProjectHistory(contractAddress).then((response) => {
                if (response.history) {
                    setNftHistory(response.history);
                }
            });
        } else {
            mainController.getNftHistoryForUser().then((response) => {
                if (response.history) {
                    setNftHistory(response.history);
                }
            });
        }
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
                        {!isProjectHistory && (<TableCell>Project</TableCell>)}
                        <TableCell>Tx</TableCell>
                        <TableCell>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {nftHistory.sort((a, b) => b.timestamp - a.timestamp)
                      .map((row, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row" >
                                {row.eventType}
                            </TableCell>
                            <TableCell align="right">{ethers.utils.formatEther(row.price)}</TableCell>
                            {!isProjectHistory && (<TableCell>{row.projectName}</TableCell>)}
                            <TableCell><a href={`${CHAIN_EXPLORER_URI}/tx/${row.transactionHash}`}>{middleEllipsis(row.transactionHash)}</a></TableCell>
                            <TableCell>{formatTimestampForHistoryTable(row.timestamp)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default NftHistory;
