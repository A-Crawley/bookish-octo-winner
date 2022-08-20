import { Avatar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home(){
    
    const [team, setTeam] = useState(null);
    const [playerId, setPlayerId] = useState(null)

    useEffect(() => {
        if (!team){
            setTeam([
                {name: 'You', id: 0},
                {name: 'Me', id: 1},
                {name: 'John', id: 2},
                {name: 'Sam', id: 3},
                {name: 'James', id: 4},
            ])
        }
    }, [team]);

    const HandlePlayerClick = (id) => {
        setPlayerId(id);
    }
    
    return (
        <>
            <Paper sx={{
                width: '250px',
                padding: '8px'
            }}>
                <Typography>
                    Team
                </Typography>
                <Divider />
                <List>
                    {team?.map((v, i) => {
                        return (
                            <ListItem key={i} disablePadding>
                            <ListItemButton onClick={() => HandlePlayerClick(v.id)}>
                                <ListItemIcon>
                                    <Avatar sizes={'small'} sx={{width: 32, height: 32}}>
                                        {v.name[0]}
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText primary={v.name}/>
                            </ListItemButton>
                        </ListItem>
                        )
                    })}
                    
                </List>
            </Paper>
            <Paper sx={{
                width: '250px',
                height: '150px',
                padding: '8px',
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around'
            }}>
                <TextField value={team && playerId !== null ? team[playerId]?.id : ''} label={'Id'} disabled={true}/>
                <TextField value={team && playerId !== null ? team[playerId]?.name : ''} label={'Name'}/>
            </Paper>
        </>
    );
}