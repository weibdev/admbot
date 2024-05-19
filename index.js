const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const path = require("path")
const db = require("./db");
const { log } = require('console');

const app = express();

app.use(json());

// app.get("/*", function (req, res) {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
//   });



const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};

app.use(cors(corsOpts));


app.post('/gift/add', json(), async (req, res) => {
    let value = req.body.value

    let response = await db.CreateGift(value);

    res.send(response)
})

app.post("/gift/get", async (req, res) => {
    const arr = await db.GetGifts()

    res.send(arr)
})

app.post("/gift/rm", async (req, res) => {
    const code = req.body.code

    let response = await db.RemoveGift(code)

    res.send(response)
})


// ====================================================================
//                      ADD PRODUTOS
// ====================================================================



app.post("/add/ccfull", async (req, res) => {
    const itens = req.body

    await itens.forEach(async (line) => {
        await db.AddCcFull(line)
        
    })

    res.send("ok")
})

app.post("/add/ccconsultadanubank", async (req, res) => {
    const itens = req.body

    await itens.forEach(async (line) => {
        await db.AddCcConsultadaNubank(line)
    })

    res.send("ok")
})

app.post("/add/ccconsultadabb", async (req, res) => {
    const itens = req.body

    await itens.forEach(async (line) => {
        await db.AddCcConsultadaBb(line)
    })

    res.send("ok")
})

app.post("/add/ccconsultadacaixa", async (req, res) => {
    const itens = req.body

    await itens.forEach(async (line) => {
        await db.AddCcConsultadaCaixa(line)
    })

    res.send("ok")
})

//CONSULTAVEL

app.post("/add/ccconsultavelitau", async (req, res) => {
    const itens = req.body

    await itens.forEach(async (line) => {
        await db.AddCcConsultavelItau(line)
    })

    res.send("ok")
})

app.post("/add/ccconsultavelsantander", async (req, res) => {
    const itens = req.body

    await itens.forEach(async (line) => {
        await db.AddCcConsultavelSantander(line)
    })

    res.send("ok")
})

app.post("/add/ccconsultavelbradesco", async (req, res) => {
    const itens = req.body

    await itens.forEach(async (line) => {
        await db.AddCcConsultavelBradesco(line)
    })

    res.send("ok")
})

app.post("/add/ccconsultavelrenner", async (req, res) => {
    const itens = req.body

    await itens.forEach(async (line) => {
        await db.AddCcConsultavelRenner(line)
    })

    res.send("ok")
})

app.post("/add/ccconsultavelatacadao", async (req, res) => {
    const itens = req.body

    await itens.forEach(async (line) => {
        await db.AddCcConsultavelAtacadao(line)
    })

    res.send("ok")
})

app.post("/add/ccconsultavelcarrefour", async (req, res) => {
    const itens = req.body

    await itens.forEach(async (line) => {
        await db.AddCcConsultavelCarrefour(line)
    })

    res.send("ok")
})


//GIFT CARD

app.post("/add/giftcard/:type", async (req, res) => {
    const itens = req.body
    const type = req.params.type

    await itens.forEach(async line => {
        await db.AddGift(type, line)
    })

    res.send('ok')
})

//Login 

app.post("/add/login/:type", async (req, res) => {
    const itens = req.body
    const type = req.params.type

    await itens.forEach(async line => {
        await db.AddLogin(type, line)
    })

    res.send('ok')
})



//LARAS 

app.post("/add/laramp", async (req, res) => {
    const itens = req.body

    await itens.forEach(async (line) => {
        await db.AddLaraMP(line)
    })

    res.send("ok")
})

app.post("/add/lararp", async (req, res) => {
    const itens = req.body

    await itens.forEach(async (line) => {
        await db.AddLaraRP(line)
    })

    res.send("ok")
})


app.post("/add/contahit/:type", async (req, res) => {
    const itens = req.body
    const type = req.params.type

    await itens.forEach(async line => {
        await db.AddContaHit(type, line)
    })

    res.send('ok')
})

app.post("/add/contaconta/:type", async (req, res) => {
    const itens = req.body
    const type = req.params.type

    await itens.forEach(async line => {
        await db.AddContaConta(type, line)
    })

    res.send('ok')
})

app.post("/add/contatela/:type", async (req, res) => {
    const itens = req.body
    const type = req.params.type

    await itens.forEach(async line => {
        await db.AddContaTela(type, line)
    })

    res.send('ok')
})

app.post("/add/contatelaconvite/:type", async (req, res) => {
    const itens = req.body
    const type = req.params.type

    await itens.forEach(async line => {
        await db.AddContaTelaConvite(type, line)
    })

    res.send('ok')
})






app.post("/get/:type", async (req, res) => {
    const arr = await db.GetProd(req.params.type)

    res.send(arr)
})

app.post("/rm", async (req, res) => {
    ''
    const {type, num, code, email, cpf} =  req.body
    
    if(!type) return

    if(num) await db.RemoveCc(num, type)
    if(code) await db.RemoveGiftcard(code, type)
    if(cpf) await db.RemoveLara(cpf, type)
    if(email) await db.RemoveLogin(email, type)

    res.send("ok")
})

app.post("/getvendas", async (req, res) => {
    const infos = await db.GetVendas()

    res.send(infos)
})

app.post("/getusers", async (req, res) => {
    const infos = await db.GetUsers()

    res.send(infos)
})

app.post("/getuser/:id", async (req, res) => {
    const id = req.params.id
    
    const infos = await db.Getuser(id)

    res.send(infos)
})


app.post("/getalldepositos", async (req, res) => {
    const infos = await db.GetDepositos()

    res.send(infos)
})

app.post("/getdepositos/user/:id", async(req, res) => {
    const userId = req.params.id

    var infos = await db.GetDepositosByUser(userId)

    res.send(infos)
})

app.post("/getdepositos/cob", async(req, res) => {
    const cobId = req.body.id

    var infos = await db.GetDepositoById(cobId)

    res.send(infos)
})




  

app.post("/loginbyuser", async (req, res) => {
    console.log('iu');

    const {user, pass} = req.body;


    const token = await db.LoginByUserAndPass(user, pass);

    console.log(token)

    res.send(token)
})




app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


app.listen(8000, () => {
    console.log("Run on port:8000")
})