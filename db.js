const firebase = require('firebase');
const uniqid = require('uniqid');
const bcrypt = require('bcrypt');

var firebaseConfig = {
    apiKey: "AIzaSyCd0Z8q0WRMPbKIDgZOLOSTcGGP8PEvCMw",
    authDomain: "bot-vendas-b342c.firebaseapp.com",
    projectId: "bot-vendas-b342c",
    storageBucket: "bot-vendas-b342c.appspot.com",
    messagingSenderId: "814069309081",
    appId: "1:814069309081:web:eb34e7759adb759941a208"
};
firebase.default.initializeApp(firebaseConfig);

const FB = firebase.default.firestore();


const LoginByUserAndPass = async (user, pass) => {
    const passHash = (await FB.collection("webpage").doc('admin').get()).data()


    if(user == 'admin' && await bcrypt.compare(pass, passHash.pass)) return {error: false, token: passHash.token}
    
    else return {error: true}
}


// START GIFT 

const CreateGift = async (value) => {
    let code = uniqid()
    let obj = {
        code,
        value,
        status: "A"
    }
    await FB.collection('gift').add(obj)
    return obj
}

const GetGifts = async () => {
    let gifts = (await FB.collection("gift").get()).docs.map(e => e.data())

    return gifts;
}

const RemoveGift = async (code) => {
    let docId = (await FB.collection('gift').where("code", "==", code).get()).docs[0].id
    await FB.collection('gift').doc(docId).delete()
    return { error: false }
}

//END GIFT


//START ADD PRODS

// PREPAID $22
// STANDARD $25
// CLASSIC $25
// DISCOVER $25
// PERSONAL $25
// DESCONHECIDO $30
// CORPORATE $30
// ELO $35
// GOLD $35
// BUSINESS $45
// HIPERCARD $45
// PLATINUM $50
// BLACK $80
// INFINITE $80  
// AMEX $100

const AddCcFull = async (line) => {
    if (!line) return

    var price


    let arr = line.split("|")

    if (arr[7] == 'PREPAID') price = 22
    if (arr[7] == 'STANDARD') price = 25
    if (arr[7] == 'CLASSIC') price = 25
    if (arr[7] == 'DISCOVER') price = 25
    if (arr[7] == 'PERSONAL') price = 25
    if (arr[7] == 'DESCONHECIDO') price = 30
    if (arr[7] == 'CORPORATE') price = 30
    if (arr[7] == 'ELO') price = 35
    if (arr[7] == 'GOLD') price = 35
    if (arr[7] == 'BUSINESS') price = 45
    if (arr[7] == 'HIPERCARD') price = 45
    if (arr[7] == 'PLATINUM') price = 50
    if (arr[7] == 'BLACK') price = 80
    if (arr[7] == 'INFINITE') price = 80
    if (arr[7] == 'AMEX') price = 100

    let obj = {
        'num': arr[0],
        'val': `${arr[1]}/${arr[2]}`,
        'cvv': arr[3],
        'cpf': arr[4],
        'nome': arr[5],
        'nomBanco': arr[6],
        'nivel': arr[7],
        "band": arr[8],
        "type": arr[9],
        "pais": arr[10],
        "price": price
    }

    FB.collection("ccfull").add(obj)
}

//CONSULTADA

const AddCcConsultadaNubank = async (line) => {
    if (!line) return

    let arr = line.split("|")
    let obj = {
        'num': arr[0],
        'val': `${arr[1]}/${arr[2]}`,
        'cvv': arr[3],
        'pass': arr[4],
        'cpf': arr[5],
        'nome': arr[6],
        'nomBanco': arr[7],
        'nivel': arr[8],
        "band": arr[9],
        "type": arr[10],
        "pais": arr[11],
        "limit": arr[12],
        'price': arr[13]
    }

    if (obj) FB.collection("ccconsultadanubank").add(obj)
}

const AddCcConsultadaBb = async (line) => {
    if (!line) return

    let arr = line.split("|")
    let obj = {
        'num': arr[0],
        'val': `${arr[1]}/${arr[2]}`,
        'cvv': arr[3],
        'pass': arr[4],
        'cpf': arr[5],
        'nome': arr[6],
        'nomBanco': arr[7],
        'nivel': arr[8],
        "band": arr[9],
        "type": arr[10],
        "pais": arr[11],
        "limit": arr[12],
        'price': arr[13]
    }


    if (obj) FB.collection("ccconsultadabb").add(obj)
}

const AddCcConsultadaCaixa = async (line) => {
    if (!line) return

    let arr = line.split("|")
    let obj = {
        'num': arr[0],
        'val': `${arr[1]}/${arr[2]}`,
        'cvv': arr[3],
        'pass': arr[4],
        'cpf': arr[5],
        'nome': arr[6],
        'nomBanco': arr[7],
        'nivel': arr[8],
        "band": arr[9],
        "type": arr[10],
        "pais": arr[11],
        "limit": arr[12],
        'price': arr[13]
    }

    if (obj) FB.collection("ccconsultadacaixa").add(obj)
}

//CONSULTAVEL


const AddCcConsultavelItau = async (line) => {
    if (!line) return

    let arr = line.split("|")
    let obj = {
        'num': arr[0],
        'val': `${arr[1]}/${arr[2]}`,
        'cvv': arr[3],
        'pass': arr[4],
        'cpf': arr[5],
        'nome': arr[6],
        'nomBanco': arr[7],
        'nivel': arr[8],
        "band": arr[9],
        "type": arr[10],
        "pais": arr[11],
        'limit': arr[12],
        'price': arr[13],
        'banco': "Itau"
    }

    if (obj) FB.collection("ccconsultavelitau").add(obj)
}

const AddCcConsultavelSantander = async (line) => {
    if (!line) return

    let arr = line.split("|")
    let obj = {
        'num': arr[0],
        'val': `${arr[1]}/${arr[2]}`,
        'cvv': arr[3],
        'pass': arr[4],
        'cpf': arr[5],
        'nome': arr[6],
        'nomBanco': arr[7],
        'nivel': arr[8],
        "band": arr[9],
        "type": arr[10],
        "pais": arr[11],
        'limit': arr[12],
        'price': arr[13],
        'banco': "Santander"
    }

    if (obj) FB.collection("ccconsultavelsantander").add(obj)
}

const AddCcConsultavelBradesco = async (line) => {
    if (!line) return

    let arr = line.split("|")
    let obj = {
        'num': arr[0],
        'val': `${arr[1]}/${arr[2]}`,
        'cvv': arr[3],
        'pass': arr[4],
        'cpf': arr[5],
        'nome': arr[6],
        'nomBanco': arr[7],
        'nivel': arr[8],
        "band": arr[9],
        "type": arr[10],
        "pais": arr[11],
        'limit': arr[12],
        'price': arr[13],
        'banco': "Bradesco"
    }

    if (obj) FB.collection("ccconsultavelbradesco").add(obj)
}

const AddCcConsultavelRenner = async (line) => {
    if (!line) return

    let arr = line.split("|")
    let obj = {
        'num': arr[0],
        'val': `${arr[1]}/${arr[2]}`,
        'cvv': arr[3],
        'pass': arr[4],
        'cpf': arr[5],
        'nome': arr[6],
        'nomBanco': arr[7],
        'nivel': arr[8],
        "band": arr[9],
        "type": arr[10],
        "pais": arr[11],
        'limit': arr[12],
        'price': arr[13],
        'banco': "Renner"
    }

    if (obj) FB.collection("ccconsultavelrenner").add(obj)
}

const AddCcConsultavelAtacadao = async (line) => {
    if (!line) return

    let arr = line.split("|")
    let obj = {
        'num': arr[0],
        'val': `${arr[1]}/${arr[2]}`,
        'cvv': arr[3],
        'pass': arr[4],
        'cpf': arr[5],
        'nome': arr[6],
        'nomBanco': arr[7],
        'nivel': arr[8],
        "band": arr[9],
        "type": arr[10],
        "pais": arr[11],
        'limit': arr[12],
        'price': arr[13],
        'banco': "Atacadão"
    }

    if (obj) FB.collection("ccconsultavelatacadao").add(obj)
}

const AddCcConsultavelCarrefour = async (line) => {
    if (!line) return

    let arr = line.split("|")
    let obj = {
        'num': arr[0],
        'val': `${arr[1]}/${arr[2]}`,
        'cvv': arr[3],
        'pass': arr[4],
        'cpf': arr[5],
        'nome': arr[6],
        'nomBanco': arr[7],
        'nivel': arr[8],
        "band": arr[9],
        "type": arr[10],
        "pais": arr[11],
        'limit': arr[12],
        'price': arr[13],
        'banco': "Carrefour"
    }

    if (obj) FB.collection("ccconsultavelcarrefour").add(obj)
}


//GIFT CARD 
const AddGift = async (type, line) => {
    var collection = `gift${type}`

    if (!line) return

    let arr = line.split("|")
    let obj = {
        code: arr[0],
        value: arr[1],
        price: +arr[1] / 2,
        name: type
    }

    if(obj) FB.collection(collection).add(obj)
}


//LARAS 

const AddLaraMP = async (line)=> {
    if (!line) return

    let arr = line.split("|")
    let obj = {
        name: arr[0],
        sexo: arr[1],
        cpf: arr[2],
        email: arr[3],
        price: +arr[4]
    }

    if(obj) FB.collection('laramp').add(obj);
}

const AddLaraRP = async (line)=> {
    if (!line) return

    let arr = line.split("|")
    let obj = {
        name: arr[0],
        sexo: arr[1],
        cpf: arr[2],
        email: arr[3],
        pass: arr[4],
        price: +arr[5]
    }

    if(obj) FB.collection('lararp').add(obj);
}

const AddLogin = async (type, line) => {
    var collection = `login${type}`

    if (!line) return

    let arr = line.split("|")

    const obj = {
        email: arr[0],
        pass: arr[1],
        state: arr[2] ? arr[2] : ""
    }

    FB.collection(collection).add(obj);
}

const AddContaHit = (type, line) => {
    var collection = `hit${type}`


    if (!line) return

    let arr = line.split("|")

    const obj = {
        email: arr[0],
        pass: arr[1],
    }

    FB.collection(collection).add(obj);
}

const AddContaConta = (type, line) => {
    var collection = `conta${type}`


    if (!line) return

    let arr = line.split("|")

    const obj = {
        email: arr[0],
        pass: arr[1],
    }

    FB.collection(collection).add(obj);
}

const AddContaTela = (type, line) => {
    var collection = `tela${type}`

    if (!line) return

    let arr = line.split("|")

    const obj = {
        email: arr[0],
        pass: arr[1],
        numTela: arr[2],
        pin: arr[3] ? arr[3] : false 
    }

    FB.collection(collection).add(obj);
}

const AddContaTelaConvite = (type, line) => {
    var collection = `tela${type}`

    if (!line) return

    let arr = line.split("|")

    const obj = {
        email: arr[0],
        link: arr[0],
    }

    FB.collection(collection).add(obj);
}


// AddLara("Teste|M|11122233344|teste@gmail.com|150").then(console.log)


const RemoveCc = async (num, type) => {
    let docId = (await FB.collection(type).where("num", "==", num).get()).docs[0].id
    await FB.collection(type).doc(docId).delete()
    return { error: false }
}

const RemoveGiftcard = async (code, type) => {
    let docId = (await FB.collection(type).where("code", "==", code).get()).docs[0].id
    await FB.collection(type).doc(docId).delete()
    return { error: false }
}

const RemoveLogin = async (email, type) => {
    let docId = (await FB.collection(type).where("email", "==", email).get()).docs[0].id
    await FB.collection(type).doc(docId).delete()
    return { error: false }
}

const RemoveLara = async (cpf, type) => {
    let docId = (await FB.collection(type).where("cpf", "==", cpf).get()).docs[0].id
    await FB.collection(type).doc(docId).delete()
    return { error: false }
}

//END ADD PRODS

// AddCcFull("4642940297389093|01|2028|168|661.743.417-04|EDIVALDO FERREIRA|CREDCARD|BLACK|VISA|CREDITO|BRASIL")

// START GET PRODS

const GetProd = async (type) => {
    let infos = (await FB.collection(type).get()).docs.map(e => e.data())

    return infos;
}

// END GET PRODS


const GetVendas = async() =>{
    let infos = (await FB.collection("vendas").doc("historico").get()).data().his

    return infos
}

const GetUsers = async() => {
    var infos = (await FB.collection("users").get()).docs.map(i => i.data())

    return infos
}

const Getuser = async(id) => {
    var infos = (await FB.collection("users").where("id", "==", +id).get()).docs[0].data()

    return infos
}

const GetDepositos = async () => {
    var infos = (await FB.collection("depositos").doc("historico").get()).data()

    return infos.depositos
}


const GetDepositoById = async (id) => {
    var infoSnap = (await FB.collection("depositos").where("idCob", "==", id).get()).docs[0]

    if (infoSnap) return infoSnap.data()
    else return {error:true}
}


const GetDepositosByUser = async (id) => {
    var infoSnap = (await FB.collection("depositos").where("idUser", "==", +id).get()).docs

    var infos = infoSnap.map(i => i.data())

    if (infos) return infos
    else return {error:true}
}


module.exports = {
    CreateGift,
    GetGifts,
    RemoveGift,
    AddCcFull,
    AddCcConsultadaNubank,
    AddCcConsultadaBb,
    AddCcConsultadaCaixa,
    AddCcConsultavelItau,
    AddCcConsultavelSantander,
    AddCcConsultavelBradesco,
    AddCcConsultavelRenner,
    AddCcConsultavelCarrefour,
    AddCcConsultavelAtacadao,
    GetProd,
    RemoveCc,
    AddGift,
    RemoveGiftcard,
    AddLaraMP,
    AddLaraRP,
    AddLogin,
    RemoveLogin,
    AddContaHit,
    AddContaConta,
    GetVendas,
    RemoveLara,
    GetUsers,
    Getuser,
    GetDepositos,
    GetDepositoById,
    GetDepositosByUser,
    AddContaTela,
    AddContaTelaConvite,
    LoginByUserAndPass
}