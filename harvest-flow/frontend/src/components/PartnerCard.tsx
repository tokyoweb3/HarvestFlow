import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export type PartnerCardProps = {
  img?: any;
  title?: string;
  job_title?: string;
  content?: string;
  top?: string;
};

const PartnerCard: React.FC<PartnerCardProps> = ({
  img,
  job_title,
  title,
  content,
  top,
}) => {
  return (
    <Card
      sx={{
        position: "absolute",
        top: top,
        zIndex: 10,
        boxSizing: "border-box",
        width: "80%",
        marginLeft: "7%",
        maxWidth: "1000px",
        display: "flex",
        flexDirection: "row",
        border: "1px solid #000",
        borderRadius: "0px",
        padding: "2rem",
      }}
    >
      <Grid container>
        <Grid xs={6}>
          <CardMedia sx={{ height: 490 }} image={img} title="green iguana" />
        </Grid>
        <Grid xs={6}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              sx={{
                fontSize: "15px",
                fontWeight: "400",
                lineHeight: "18px",
                marginTop: "70px",
              }}
              component="div"
            >
              {job_title}
            </Typography>

            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontSize: "28px",
                marginTop: "20px",
                fontWeight: "500",
                lineHeight: "36px",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                marginTop: "120px",
                fontSize: "15px",
                fontWeight: "500",

                lineHeight: "18px",
                letterSpacing: "1px",
              }}
            >
              {content}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};
export default PartnerCard;
