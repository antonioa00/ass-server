import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    // persona
    nome: {
      type: String,
      required: true,
    },
    codFiscale: String,
    numTel: Number,
    email: String,
    indirizzo: String,
    classe: Number,
    classePre: Number,
    // polizza
    compagnia: String,
    numPolizza: Number,
    numSostituta: Number,
    numAbbinata: Number,
    frazionamento: String,
    dataEmissione: Date,
    pervenuta: String,
    dataScadenza: Date,
    dataScadenza2: Date,
    importo: Number,
    tipoPagamento: String,
    dataPagamento: Date,
    // veicolo
    targa: String,
    modello: String,
    numCilindrata: Number,
    numCavalli: Number,
    numQuintali: Number,
    numKw: Number,
    // altro
    note: String,
    // file
    file: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
