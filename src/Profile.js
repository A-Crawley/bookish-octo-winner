import { Paper, TextField } from "@mui/material";

export default function Profile({ guest }) {
  return (
    <Paper
      style={{
        width: "100%",
        height: "100%",
        padding: "16px",
      }}
      elevation={0}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <Paper
          style={{
            width: "256px",
            height: "256px",
            background: "grey",
          }}
        ></Paper>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "16px",
            width: "256px",
            height: "256px",
            justifyContent: "space-around",
          }}
        >
          <TextField label={"Title"} />
          <TextField label={"Name"} />
          <TextField label={"Rank"} />
        </div>
      </div>
    </Paper>
  );
}
