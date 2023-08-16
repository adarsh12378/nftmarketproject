'use client'
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import Link from "next/link";
import styles from "../table.module.css";

type NFTData = {
  collection: number;
  id: string;
  name: number;
  symbol: string;
  blockchain: string;
  structure: string;
  status: string;
  owner: string;
};

async function listAvailableTokens() {
  const apiKey = "2f529f33-de82-4e8e-a3cd-abc51cf253bd";
  const response = await fetch("https://api.rarible.org/v0.1/collections/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
    },
  });

  const tokenListJSON = await response.json();
  return tokenListJSON.collections;
}

export default function BasicTable() {
  const [tokenData, setTokenData] = useState<NFTData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tokensPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await listAvailableTokens();
      setTokenData(data);
    }
    fetchData();
  }, []);

  // Filtering tokens based on the search term
  const filteredTokens = tokenData.filter((token) => {
    const nameMatch =
      token.name && token.name.toLowerCase().includes(searchTerm.toLowerCase());
    const symbolMatch =
      token.symbol && token.symbol.toLowerCase().includes(searchTerm.toLowerCase());
  
    return nameMatch || symbolMatch;
  });
  // Pagination
  const indexOfLastToken = currentPage * tokensPerPage;
  const indexOfFirstToken = indexOfLastToken - tokensPerPage;
  const currentTokens = filteredTokens.slice(
    indexOfFirstToken,
    indexOfLastToken
  );

  // Change page
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="table-container">
      <TextField
        label="Search by name or symbol"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <i className="fa fa-search" />
            </InputAdornment>
          ),
        }}
        className="search-input"
      />
      <TableContainer component={Paper} className="table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Symbol</TableCell>
              <TableCell align="right">Blockchain</TableCell>
              <TableCell align="right">Structure</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Owner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTokens.map((row, index) => (
              <TableRow key={row.id} className={styles.tablebody}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Link href={`NftData/${row.id}`} passHref className="link-style">
                    {row.name}
                  </Link>
                </TableCell>
                <TableCell align="right">{row.symbol}</TableCell>
                <TableCell align="right">{row.blockchain}</TableCell>
                <TableCell align="right">{row.structure}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.owner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination-container">
        <Pagination
          count={Math.ceil(filteredTokens.length / tokensPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      </div>
    </div>
  );
}
