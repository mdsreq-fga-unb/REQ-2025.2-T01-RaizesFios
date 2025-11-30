import app from "./app";

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});
