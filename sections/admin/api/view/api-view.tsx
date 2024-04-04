'use client';

import { useSettingsContext } from "#/components/settings";
import { Container, Typography } from "@mui/material";
import APINewEditForm from "../api-new-edit-form";

export default function APIView() {
  const settings = useSettingsContext();
  const linkAPI = "www.youtube.vn"
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h3" sx={{
        mb: { xs: 3, md: 5 },
      }}>API Cập nhật</Typography>
      <APINewEditForm linkAPI={linkAPI} />
    </Container>
  )
}