require('dotenv').config()
const { decryptMedia } = require('@open-wa/wa-automate')

const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const axios = require('axios')
const os = require('os')
const سرعة = require('performance-now')
const fetch = require('node-fetch')
const translatte = require('translatte')
const bent = require('bent')
const request = require('request-promise')
const emojiUnicode = require('emoji-unicode')
const get = require('got')

const appRoot = require('app-root-path')
const low = require('lowdb')
const google = require('google-it')
const { stdout } = require('process');
const Math_js = require('mathjs')
const FileSync = require('lowdb/adapters/FileSync')
const db_group = new FileSync(appRoot+'/lib/data/group.json')
const db = low(db_group)
db.defaults({ group: []}).write()

const { 
    removeBackgroundFromImageBase64
} = require('remove.bg')

const {
    exec
} = require('child_process')

const { 
    menuId, 
    cekResi, 
    urlShortener, 
    meme, 
    translate, 
    getLocationData,
    images,
    resep,
    rugapoi,
    rugaapi,
    cariKasar,
    downloader
} = require('./lib')


const {
    stickerburn,
    stickerlight
    } = require('./lib/sticker')

const { 
    msgFilter, 
    color, 
    processTime, 
    isUrl,
	download
} = require('./utils')


const { 
    uploadImages,
    custom,
    picturemis
 } = require('./utils/fetcher')

const fs = require('fs-extra')
const { index } = require('mathjs')
const banned = JSON.parse(fs.readFileSync('./settings/banned.json'))
const simi = JSON.parse(fs.readFileSync('./settings/simi.json'))
const ngegas = JSON.parse(fs.readFileSync('./settings/ngegas.json'))
const setting = JSON.parse(fs.readFileSync('./settings/setting.json'))

let dbcot = JSON.parse(fs.readFileSync('./lib/database/bacot.json'))
let dsay = JSON.parse(fs.readFileSync('./lib/database/say.json'))
let _autostiker = JSON.parse(fs.readFileSync('./lib/helper/antisticker.json'))
let antilink = JSON.parse(fs.readFileSync('./lib/helper/antilink.json'))
let muted = JSON.parse(fs.readFileSync('./lib/database/muted.json'))


let { 
    ownerNumber, 
    groupLimit, 
    memberLimit,
    prefix,
    vhtearkey,
    keepSave,
    iTechApi,
    apiKey
} = setting

const {
    apiNoBg,
	apiSimi
} = JSON.parse(fs.readFileSync('./settings/api.json'))

function formatin(duit){
    let	reverse = duit.toString().split('').reverse().join('');
    let ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const inArray = (needle, haystack) => {
    let length = haystack.length;
    for(let i = 0; i < length; i++) {
        if(haystack[i].id == needle) return i;
    }
    return false;
}



const errorurl = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
const errorurl2 = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'


module.exports = HandleMsg = async (aruga, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, author, mentionedJidList, } = message
        let { body } = message
        var { name, formattedTitle, gcok} = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName // verifiedName is the name of someone who uses a business account
        const botNumber = await aruga.getHostNumber() + '@c.us'
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await aruga.getGroupAdmins(groupId) : ''
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
		const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
        const pengirim = sender.id
        const serial = sender.id
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const blockNumber = await aruga.getBlockedIds()
        const groupMembers = isGroupMsg ? await aruga.getGroupMembersId(groupId) : ''
        const GroupLinkDetector = antilink.includes(chatId)
        const stickermsg = message.type === 'sticker'

        // Bot Prefix
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption || type === 'video' && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const arg = body.trim().substring(body.indexOf(' ') + 1)
        const args = body.trim().split(/ +/).slice(1)
        const q = args.join(' ')
		const argx = chats.slice(0).trim().split(/ +/).shift().toLowerCase()
        const isCmd = body.startsWith(prefix)
        const waver = await aruga.getWAVersion()
         const uaOverride = process.env.UserAgent
        const url = args.length !== 0 ? args[0] : ''
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
		
        // [IDENTIFY]
        const ownerNumber = "16623762719@c.us"
        const isOwnerBot = ownerNumber.includes(pengirim)
        const isOwner = ownerNumber.includes(pengirim)
        const isOwnerB = ownerNumber.includes(pengirim)
        const isBanned = banned.includes(pengirim)
		const isSimi = simi.includes(chatId)
		const isNgegas = ngegas.includes(chatId)
        const isKasar = await cariKasar(chats)
        const isAutoStikerOn = isGroupMsg ? _autostiker.includes(chat.id) : false
        const isImage = type === 'image'
        
        //
        if(!isCmd && isKasar && isGroupMsg) { console.log(color('[BADW]', 'orange'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${argx}`), 'from', color(pushname), 'in', color(name || formattedTitle)) }
        if (isCmd && !isGroupMsg) { console.log(color('[marco]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        if (isCmd && isGroupMsg) { console.log(color('[marco]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }

      

//  if (chats == 'السلام عليكم'){
//           aruga.reply(from, 'وعليكم السلام ورحمه الله وبركاته', id)
//       }
      if (chats == 'سلام'){
          aruga.reply(from, 'وعليكم السلام ورحمه الله وبركاته', id)
      }
      if (chats == 'ماركو'){
          aruga.reply(from, ' ماركو يحكم ماركو يسيطر ', id)
      }
      if (chats == 'ماركو العنقاء'){
          aruga.reply(from, 'اه بلبى ماركو ويلبى من يناديه', id)
        }
      if (chats == 'كلزق'){
          aruga.reply(from, 'انت  كلزق', id)
        }
      if (chats == '#'){
          aruga.reply(from, 'هل تقصد #اوامر', id)
      }
      if (chats == 'شكرا'){
          aruga.reply(from, 'عفوا', id)
      }
      if (chats == '#bokep2'){
          aruga.reply(from, '*Demi kenyamanan bersama,*\n*Maaf menu ini telah di hapus!.*', id)
    //   }
    // if (chats == 'السلام عليكم'){
    //     aruga.sendPtt(from, './media/aslam.mp3', id)
      }
      if (chats == 'زق'){
          aruga.sendPtt(from, './media/astg.mp3', id)
        }
        if (chats == 'حمار'){
            aruga.sendPtt(from, './media/astg.mp3', id)
        }
        if (chats == 'كافر'){
            aruga.sendPtt(from, './media/astg.mp3', id)
        }
        if (chats == 'اسنغفر الله'){
            aruga.sendPtt(from, './media/astg.mp3', id)
      }
      if (chats == 'اهلا'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }        
      if (chats == 'هلاو'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'هله'){
          aruga.sendPtt(from, './media/ohayou.mp3', id)
      }
      if (chats == 'ايش'){
          aruga.sendPtt(from, './media/nani-kore.mp3', id)
      }
      if (chats == 'ايش؟'){
          aruga.sendPtt(from, './media/nani-kore.mp3', id)
      }
      if (chats == 'هطف'){
        aruga.sendPtt(from, './media/bakaa.mp3', id)
      }
      if (chats == 'غبي'){
        aruga.sendPtt(from, './media/bakaa.mp3', id)
      }
      if (chats == 'هلا'){
        aruga.sendPtt(from, './media/ohayou.mp3', id)
    }
    if (chats == 'تيتش'){
      aruga.sendPtt(from, './media/t.mp3', id)
    }
    if (chats == 'سانجي'){
      aruga.sendPtt(from, './media/s.mp3', id)
    }
    if (chats == 'شيزار'){
      aruga.sendPtt(from, './media/sh.mp3', id)
    }
    if (chats == 'دوفلامينجو'){
      aruga.sendPtt(from, './media/d.mp3', id)
    // }
    // if (chats == 'اوني تشان'){
    //   aruga.sendPtt(from, './media/yam.mp3', id)
    }
    if (chats == 'دوفي'){
      aruga.sendPtt(from, './media/d.mp3', id)
    }
    if (chats == 'دوفلامينغو'){
      aruga.sendPtt(from, './media/d.mp3', id)
    }
    if (chats == 'الجوكر'){
      aruga.sendPtt(from, './media/d.mp3', id)
    }
    if (chats == 'لايت'){
      aruga.sendPtt(from, './media/l.mp3', id)
      }
      


        const mess = {
            wait: '[انتظر] قيد التقدم⏳ يرجى الانتظار لحظة',
            error: {
                
                St: '[❗] أرسل الصورة مع التسمية التوضيحية * / sticker * أو علامة الصورة التي تم إرسالها',
                Ti: '[❗] أعد تشغيل الملصق مع التسمية التوضيحية * / stickertoimg * أو علامة الملصق التي تم إرسالها',
                Qm: '[❗] حدث خطأ ، ربما الموضوع غير متوفر!',
                Yt3: '[❗] حدث خطأ غير قادر على التحويل إلى mp3!',
                Yt4: '[❗] حدث خطأ ، ربما كان الخطأ ناتجًا عن النظام.',
                Ig: '[❗] حدث خطأ ، ربما لأن الحساب خاص',
                Ki: '[❗] لا يستطيع البوت طرد مدير المجموعة!',
                Sp: '[❗] لا يمكن للبوت طرد المسؤول',
                Ow: '[❗] لا يمكن للبوت إصدار المسؤول',
                Bk: '[❗] لا يمكن للبوت حظر المالك',
                Ad: '[❗] لا يمكن إضافة الهدف ، ربما لأنه خاص',
                Iv: '[❗] الرابط الذي قدمته غير صالح!'
            
            }
        }
        
        const isMuted = (chatId) => {
          if(muted.includes(chatId)){
            return false
        }else{
            return true
            }
        }


        //fitur anti link
        if (isGroupMsg && GroupLinkDetector && !isGroupAdmins && !isOwner){
            if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                const check = await aruga.inviteInfo(chats);
                if (!check) {
                    return
                } else {
                    aruga.reply(from, '*[GROUP LINK DETECTOR!]*\nKamu mengirimkan link grup chat, maaf kamu segera di kick dari grup.\n\n~marcoBot', id).then(() => {
                        aruga.removeParticipant(groupId, sender.id)
                    })
                }
            }
        }
        
        
        
        if (isAutoStikerOn && isMedia && isImage) {
            const mediaData = await decryptMedia(message, uaOverride)
            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await aruga.sendImageAsSticker(from, imageBase64)
                .then(async () => {
                    console.log(`Sticker processed for ${processTime(t, moment())} ثانيةs`)
                })
                .catch(async (err) => {
                    console.error(err)
                    await aruga.reply(from, `Error!\n${err}`, id)
                })
        }

        // Kerang Menu
        //BUAT NOMER CEGAN/CECAN, KALIAN BISA CUSTOM SENDIRI, MAKASEH!

        const cegan = [
            "https://i.ibb.co/JmVx5bJ/Cogan.jpg",
            "https://i.ibb.co/JmVx5bJ/Cogan.jpghttps://i.ibb.co/3pGT2PT/Cogan-1.jpg",
            "https://i.ibb.co/mSbzWBg/Boyfriend-material-cogan.jpg",
            "https://i.ibb.co/K29d94b/download-4.jpg",
            "https://i.ibb.co/L0Fxdsb/image.jpg",
            "https://i.ibb.co/9GYpqDt/lang2-4.jpg"
        ]
        const cecan = [
            {
            lahwoi : "Nih...",
            imagex : "https://i.ibb.co/VT4ggGj/Instagram.jpg",
            },
            {
            lahwoi : "Nih...",
            imagex : "https://i.ibb.co/x1nD1HD/Instagram-1.jpg",
            },
            {
            lahwoi : "Nih...",
            imagex : "https://i.ibb.co/ZXPPFKF/Argumentasi-Dimensi.jpg",
            },
            {
            lahwoi : "Nih...",   
            imagex : "https://i.ibb.co/NpY5ZBR/image.jpg",
            },
            {
            lahwoi : "Nih...",
            imagex : "https://i.ibb.co/PWsL6HF/download-1.jpg",
            },
            {
            lahwoi : "Nih...",
            imagex :"https://i.ibb.co/JFkDWjB/RASANYA-ANJING-BANGET.jpg",
            },
            {
            lahwoi : "Nih...",
            imagex : "https://i.ibb.co/5W2gMq6/download-2.jpg",
            },
            {
            lahwoi : "Nih...",
            imagex : "https://i.ibb.co/QNWhdgC/download-3.jpg",
            },
            {
            lahwoi : "Nih...",
            imagex : "https://i.ibb.co/RS1vWC3/Blur.jpg"
            }
        ]
        
        const estetek = [
            "https://i.ibb.co/Xk1kggV/Aesthetic-Wallpaper-for-Phone.jpg",
            "https://i.ibb.co/wBNyv8X/image.jpg",
            "https://i.ibb.co/hgcJbg7/Leaving-Facebook.jpg",
            "https://i.ibb.co/27TW3bT/Pinterest.jpg",
            "https://i.ibb.co/2MR16Ct/Image-about-vintage-in-ALittle-Bit-Of-This-And-That-المطور-Little-Nerdy-Gnome.jpg",
            "https://i.ibb.co/WfrzTWH/minteyroul-on-We-Heart-It.jpg",
            "https://i.ibb.co/dMpkfWT/1001-Kreative-Aesthetic-Wallpaper-Ideen-f-r-das-Handy.jpg",
            "https://i.ibb.co/cN3Br2J/red-grunge-wallpaper-dark-edgy-aesthetic-collage-background-trendy-cool-dark-red-iphone-wallpaper.jpg",
            "https://i.ibb.co/c8QMXZv/ee16de425985d4a1b628dddc1461b546.jpg"
        ]


	const apakah = [
            'Ya',
            'Tidak',
            'Ga tau'
            ]

        const bisakah = [
            'يب يب',
            'مدري',
            'لا'
            ]

            const rrr = [
                'الخلل مو من البوت من الناس الي عقولهم عقول بوت - ديمو',
                '"هذه النهاية. قير فورث! سنيك-مان!" -مونكي دي لوفي',
                'الخلل مو من البوت من الناس الي عقولهم عقول بوت - ديمو',
                '"عِش وفقًا لأفكارك يا لوفي. هناك أوقات يحدد فيها العصر فجأة كل شيء ... واجه العالم! سيأتي اليوم الذي نلتقي فيه." -مونكي دي دراغون',
                '"في ما يزيد قليلاً عن 20 عامًا ، ستندلع بالتأكيد حرب ضخمة قادرة على فصل المحيطات. بعبارة أخرى ، في غضون 20 عامًا ، سيظهر أبطال هذه الحرب الهائلة في العالم الجديد! إنهم من يستطيع هزيمة كايدو! -كوزوكي أودين',
                '"لوفي... ساعدني." -نامي',
                '"اسمي مومونوسوكي كوزوكي! أنا من سأصبح شوغون وانو!" - مومونوسوكي كوزوكي',
                '"حتى أهزمه و أصبح أعظم مبارز في العالم, لن يهزمني أحد!" -رورونوا زورو',
                '"هل تصدق يا غارب? طفل على وشك أن يولد... طفلي. احميه من أجلي." -قول دي روجر',
                '"لن أموت ، مهما حدث! هذا وعد! لا يمكن أن أموت وأترك ​​أخي الصغير الضعيف بمفرده!" بورتجاس دي أيس',
                '"شكرا... على حبكم لي!" -بورتقاس دي أيس',
                '"البحر شاسع. في يوم من الأيام ، سيظهر الأصدقاء الذين سيحمونك بلا أدنى شك!" - جاغوار دي سول',
                '"أريد أن أعيش! خذوني إلى البحر معكم!" -نيكو روبن',
                '"سانجي! لقد أسعدتني! شكرا لاعتمادك علي." -نيكو روبن',
                '"لا ، سآخذها! إنما ... !!" -رورونوا زورو',
                '"لا تطأ وانو مرة أخرى!" -كوزوكي أودين',
                '"أنا أودين! و قد ولدت لأغلي!" -كوزوكي أودين',
                '"كيف يمكنني حماية طموحي وأنا لا أستطيع حتى حماية قبطاني؟ لوفي هو الرجل الذي سيكون ملك القراصنة!" -رورونوا زورو',
                '"اسمي ... كيوما! عضو المعمل رقم واحد! مؤسس هذا المعمل ... باحث عن الفوضى ، مدمر الهيكل الحاكم لهذا العالم ... العالم المجنون ... هوين كيوما!" -أوكابي رينتارو',
                '"ماذا جرى, هاموك?" -مونكي دي لوفي',
                '"لوفي ، هل تسمعني؟ آسف لقلقك. إذا لم أصبح أعظم مبارز في العالم ، ستكون في مأزق الآن ، أليس كذلك؟ لن أخسر أبدًا! حتى هزمه وأصبح أعظم مبارز في العالم ، لن يهزمني أحد أبدًا! " -رورونوا زورو',
                '"حسنًا ، هذا لأن البشر لديهم الكثير من الوقت في أيديهم. ولكن هذا هو أعظم ميزة لهم. كائن حي لديه وقت فائض في قلبه ... ما مدى روعة ذلك؟" -ميغي',
                '"ليس الكل اصحابك فالافعى تحتظن فريستها قبل قتلها- ديمو"',
                '"سترو تشان ... عليك أن تنقذ أخيك ، مهما حدث!" - بون كلاي'
                ]   

        const kapan = [
            'زورو',
            'فيغابانك',
            'لوفي',
            'نامي',
            'ياماتو',
            'هانكوك',
            'ريجو',
            'هيناتا',
            'يونا',
            'تسونادي',
            'بلاك',
            'كيرا',
            'نيترو',
            'اوياجي',
            'تيتش',
            'تايجا',
            'ساشا',
            'ليفاي',
            'محد يقبل فيك',
            'ميكاسا',
            'هستوريا',
            'شيرو',
            'ايس',
            'ماركو',
            'لوسي',
            'اومارو',
            'ميغومي',
            'ايرزا',
            'لين راسل',
            'هيناتا',
            'كيكيو',
            'سانجي',
            'ايرين',
            'اليزابيث',
            'اسونا يوكي',
            'اكاينو',
            'دايلر',
            'ديمو',
            'بتس',
            'مالك زوج',
            'توموري ناو',
            'كورياما ميراي',
            'هاناتو كوباتو',
            'يوكاري',
            'كارين ستافيلد',
            'يوزوكي إيبا',
            'مطلقه'
            ]

        const rate = [
            '100%',
            '95%',
            '90%',
            '85%',
            '80%',
            '75%',
            '70%',
            '65%',
            '60%',
            '55%',
            '50%',
            '45%',
            '40%',
            '35%',
            '30%',
            '25%',
            '20%',
            '15%',
            '10%',
            '5%'
            ]
 const santet = [
            'Muntah Paku',
            'Meninggoy',
            'Berak Paku',
            'Muntah Rambut',
            'Ketempelan MONYET!!!',
            'Berak di Celana Terus',
            'Menjadi Gila',
            'Menjadi manusiawi',
            'jomblo selamanya',
            'ga bisa berak',
            'ketiban pesawat',
            'jatuh dikamar mandi'    
            ]

        const kutuk = [
            'Sapi',
            'Batu',
            'Babi',
            'Anak soleh dan soleha',
            'pohon pisang',
            'janda',
            'bangsat',
            'buaya',
            'Jangkrik',
            'Kambbiingg',
            'Bajing',
            'kang seblak',
            'kang gorengan',
            'kang siomay',
            'badut ancol',
            'Tai',
            'Kebo',
            'Badak biar Asli',
            'tai kotok',
            'Bwebwek',
            'Orang Suksesss...... tapi boong',
            'Beban Keluarga' //tambahin  aja
            ]
          
      const sotoy = [
        '🍊 : 🍒 : 🍐',
        '🍒 : 🔔 : 🍊',
        '🍇 : 🍒 : 🍐',
        '🍊 : 🍋 : 🔔',
        '🔔 : 🍒 : 🍐',
        '🔔 : 🍒 : 🍊',
        '🍊 : 🍋 : 🔔',        
        '🍐 : 🍒 : 🍋',
        '🍐 : 🍐 : 🍐',
        '🍊 : 🍒 : 🍒',
        '🔔 : 🔔 : 🍇',
        '🍌 : 🍒 : 🔔',
        '🍐 : 🔔 : 🔔',
        '🍊 : 🍋 : 🍒',
        '🍋 : 🍋 : 🍌',
        '🔔 : 🔔 : 🍇',
        '🔔 : 🍐 : 🍇',
        '🔔 : 🔔 : 🔔',
        '🍒 : 🍒 : 🍒',
        '🍌 : 🍌 : 🍌',
        '🍇 : 🍇 : 🍇',
        '🍊 : 🍒 : 🍒',
        '🔔 : 🔔 : 🍇',
        '🍌 : 🍒 : 🔔',
        '🍐 : 🔔 : 🔔',
        '🍊 : 🍋 : 🍒',
        '🍋 : 🍋 : 🍌',
        '🔔 : 🔔 : 🍇',
        '🔔 : 🍐 : 🍇',
        '🍊 : 🍒 : 🍐',
        '🍒 : 🔔 : 🍊',
        '🍇 : 🍒 : 🍐',
        '🍊 : 🍋 : 🔔',
        '🔔 : 🍒 : 🍐',
        '🔔 : 🍒 : 🍊',
        '🍊 : 🍋 : 🔔',        
        '🍐 : 🍒 : 🍋'
        ]

    

	// Filter Banned People
        if (isBanned) {
            return console.log(color('[BAN]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        }

		
        switch (command) {
        // Menu and TnC
        
case 'نوت':
case 'أوامر':
case 'اوامر':
             const test0 = sender.id
            const nyoba2 = await aruga.getProfilePicFromServer(test0)
            if (nyoba2 == undefined) {
                var php2 = 'https://i.ibb.co/pbZB6z7/fc6b621c54fe.jpg'
                } else {
                var php2 = nyoba2
                }
            await aruga.sendFileFromUrl(from, php2, 'image.jpg', menuId.textMenu(pushname,waver), id)
            .then(() => ((isGroupMsg) && (isGroupAdmins)) ? aruga.sendText(from, `*إذا تريد اوامر المشرفين إذهب للإدارة وقم بطلبها*`) : null)
            break

            case 'المطور':
                const test1 = sender.id
                const nyoba3 = await aruga.getProfilePicFromServer(test1)
                            if (nyoba3 == undefined) {
                                var php2 = 'https://i.ibb.co/pbZB6z7/fc6b621c54fe.jpg'
                                } else {
                                var php2 = nyoba3
                                }
                            await aruga.sendFileFromUrl(from, php2, 'image.jpg', menuId.textzzx(pushname,waver), id)
                            .then(() => ((isGroupMsg) && (isGroupAdmins)) ? aruga.sendText(from, `*إذ لم تكن المطور سيتم تبنيد من البوت إذ إاستخدمت أحد الأوامر*`) : null)
                            break

                            case 'مواهب':
                                const test2 = sender.id
                                const nyoba4 = await aruga.getProfilePicFromServer(test2)
                                            if (nyoba4 == undefined) {
                                                var php2 = 'https://i.ibb.co/pbZB6z7/fc6b621c54fe.jpg'
                                                } else {
                                                var php2 = nyoba4
                                                }
                                            await aruga.sendFileFromUrl(from, php2, 'image.jpg', menuId.textzzz(pushname,waver), id)
                                            .then(() => ((isGroupMsg) && (isGroupAdmins)) ? aruga.sendText(from, `*هذه فروع المواهب الخاصة بدايموند*`) : null)
                                            break



        case 'slightningt':
            aruga.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!`, id)
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const getUrle = await uploadImages(mediaData, false)
                const imgnye = await stickerlight(getUrle)
                const rugaapi = imgnye.result.imgUrl
                await aruga.sendStickerfromUrl(from, rugaapi)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const getUrle = await uploadImages(mediaData, false)
                const imgnye = await stickerlight(getUrle)
                const rugaapi = imgnye.result.imgUrl
                await aruga.sendStickerfromUrl(from, rugaapi)
            } else {
                await aruga.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #stickerlightning`, id)
            }
            break
        case 'stikerfire':
        case 'stickerfire':
        case 'sfire':
           aruga.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!`, id)
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerburn(getUrli)
                const Sfire = imgnya.result.imgUrl
                await aruga.sendStickerfromUrl(from, Sfire)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerburn(getUrli)
                const Sfire = imgnya.result.imgUrl
                await aruga.sendStickerfromUrl(from, Sfire)
            } else {
                await aruga.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #stickerfire`, id)
            }
            break



                    case 'tag':
                    if (!isGroupMsg) return aruga.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
                    if (!args.length >= 1) return await aruga.reply(from, 'pesan tidak boleh kosong', id) ;{
                        const text = body.slice(5)
                        const mem = groupMembers
                        const randMem = mem[Math.floor(Math.random() * mem.length)];
                        const sapa = `${text} 👉 @${randMem}`
                        await aruga.sendTextWithMentions(from, sapa)
                    }
                    break    
                    case 'ava':
                    if (!isGroupMsg) return aruga.reply(from, 'Fitur ini hanya bisa diugnakan di dalam grup', id)
                    if (!quotedMsg) return aruga.reply(from, 'Quote/reply pesan seseorang yang akan di download صورة فوتوغرافيةnya!!', id)
                    try {
                        const dp = await aruga.getProfilePicFromServer(quotedMsgObj.sender.id)
                        if (dp == undefined) {
                            var pfp = aruga.reply(from, 'Dia ini pemalu, mungkin sedang depresi tidak berani memasang صورة فوتوغرافية profil', id)
                            } else {
                            var pfp = aruga.sendFileFromUrl(from, dp, 'profile.png')
                            } 
                    } catch {
                        aruga.reply(from, 'Tidak ada صورة فوتوغرافية profil/private', id)
                    }
                    break
                   
                // case 'زواج':
                //     if (!isGroupMsg) return aruga.reply(from, 'هذا الامر لا يعمل الا بالقروب', id)
                //     const mem = groupMembers
                //     const aku = mem[Math.floor(Math.random() * mem.length)];
                //     const kamu = mem[Math.floor(Math.random() * mem.length)];
                //     const sapa = `اقترح ان تتزوج يا... @${aku.replace(/[@c.us]/g, '')} (💘) @${kamu.replace(/[@c.us]/g, '')} هذه تليق عليك \n منك المال ومنها العيال `
                //     await aruga.sendTextWithMentions(from, sapa)
                //     break     
                

        case 'setname':
                if (!isOwnerB) return aruga.reply(from, `لا يمكن استخدام هذا الأمر إلا من قبل المالك Bot!`, id)
                    const setnem = body.slice(9)
                    await aruga.setMyName(setnem)
                    aruga.sendTextWithMentions(from, `شكرا Nama Barunya @${sender.id.replace('@c.us','')} 😘`)
                break
                case 'read':
                    if (!isGroupMsg) return aruga.reply(from, `لا يمكن استخدام هذا الأمر إلا في مجموعات!`, id)                
                    if (!quotedMsg) return aruga.reply(from, `Tolong Reply Pesan Bot`, id)
                    if (!quotedMsgObj.fromMe) return aruga.reply(from, `Tolong Reply Pesan Bot`, id)
                   try {
                        const reader = await aruga.getMessageReaders(quotedMsgObj.id)
                        let list = ''
                        for (let pembaca of reader) {
                        list += `- @${pembaca.id.replace(/@c.us/g, '')}\n` 
                    }
                        aruga.sendTextWithMentions(from, `Ngeread doangg.. Nimbrung kagaa....\n${list}`)
                    } catch(err) {
                        console.log(err)
                        aruga.reply(from, `Maaf, Belum Ada Yang Membaca Pesan Bot atau Mereka Menonaktifkan Read Receipts`, id)    
                    }
                    break
        case 'setStatus':
                if (!isOwnerB) return aruga.reply(from, `لا يمكن استخدام هذا الأمر إلا من قبل المالك Bot!`, id)
                    const setstat = body.slice(11)
                    await aruga.setMyStatus(setstat)
                    aruga.sendTextWithMentions(from, `شكرا Status Barunya @${sender.id.replace('@c.us','')} 😘`)
                break
       
	//Sticker Converter

	case 'ملصق':
            if (quotedMsg && quotedMsg.type == 'sticker') {
                const mediaData = await decryptMedia(quotedMsg)
                aruga.reply(from, `ثواني بس...`, id)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await aruga.sendFile(from, imageBase64, 'imgsticker.jpg', 'تفضل يا حلو!!', id)
                .then(() => {
                    console.log(`Sticker to Image Processed for ${processTime(t, moment())} ثانيةs`)
                })
        } else if (!quotedMsg) return aruga.reply(from, `منشن استيكر احوله صورة يبرو!`, id)
        break
			
			
             case 'stickergif':
        case 'stikergif':
case 'gifstiker':
case 'gifsticker':
case 'جيفف':
            if (isMedia || isQuotedVideo) {
                if (mimetype === 'video/mp4' && message.duration < 10 || mimetype === 'image/gif' && message.duration < 10) {
                    var mediaData = await decryptMedia(message, uaOverride)
                    aruga.reply(from, '[WAIT] Sedang di proses⏳ silahkan tunggu ± 2 min!', id)
                    var filename = `./media/stickergif.${mimetype.split('/')[1]}`
                    await fs.writeFileSync(filename, mediaData)
                    await exec(`gify ${filename} ./media/stickergf.gif --fps=30 --scale=240:240`, async function (error, stdout, stderr) {
                        var gif = await fs.readFileSync('./media/stickergf.gif', { encoding: "base64" })
                        await aruga.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`)
                        .catch(() => {
                            aruga.reply(from, 'Maaf filenya terlalu besar!,mohon kurangi durasi vidio', id)
                        })
                    })
                  } else {
                    aruga.reply(from, `[❗] Kirim vidio dengan caption *${prefix}stickergif* max durasi vidio 9 detik!`, id)
                   }
                } else {
		    aruga.reply(from, `[❗] Kirim vidio dengan caption *${prefix}stickergif*`, id)
	        }
            break                  
        case 'stikergiphy':
        case 'ستيكرر':
            if (args.length !== 1) return aruga.reply(from, `Maaf, format pesan salah.\nKetik pesan dengan ${prefix}stickergiphy <link_giphy>`, id)
            const isGiphy = url.match(new RegExp(/https?:\/\/(www\.)?giphy.com/, 'gi'))
            const isMediaGiphy = url.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'))
            if (isGiphy) {
                const getGiphyCode = url.match(new RegExp(/(\/|\-)(?:.(?!(\/|\-)))+$/, 'gi'))
                if (!getGiphyCode) { return aruga.reply(from, 'Gagal mengambil kode giphy', id) }
                const giphyCode = getGiphyCode[0].replace(/[-\/]/gi, '')
                const smallGifUrl = 'https://media.giphy.com/media/' + giphyCode + '/giphy-downsized.gif'
                aruga.sendGiphyAsSticker(from, smallGifUrl).then(() => {
                    aruga.reply(from, 'Here\'s your sticker')
                    console.log(`Sticker Processed for ${processTime(t, moment())} ثانية`)
                }).catch((err) => console.log(err))
            } else if (isMediaGiphy) {
                const gifUrl = url.match(new RegExp(/(giphy|source).(gif|mp4)/, 'gi'))
                if (!gifUrl) { return aruga.reply(from, 'Gagal mengambil kode giphy', id) }
                const smallGifUrl = url.replace(gifUrl[0], 'giphy-downsized.gif')
                aruga.sendGiphyAsSticker(from, smallGifUrl)
                .then(() => {
                    aruga.reply(from, 'Here\'s your sticker')
                    console.log(`Sticker Processed for ${processTime(t, moment())} ثانية`)
                })
                .catch(() => {
                    aruga.reply(from, `في غلط يسطا`, id)
                })
            } else {
                await aruga.reply(from, 'Maaf, command sticker giphy hanya bisa menggunakan link dari giphy.  [Giphy Only]', id)
            }
            break

	case "ريف":
	if (!isBotGroupAdmins) return aruga.reply(from, 'لا يمكن استخدام هذا الأمر إلا عندما يكون الروبوت مسؤولاً', id)
  if (!isGroupAdmins) return aruga.reply(from, 'فشل ، لا يمكن استخدام هذا الأمر إلا من قبل مشرفين المجموعة!', id)
                    if (isBotGroupAdmins) {
                        aruga
                            .revokeGroupInviteLink(from)
                            .then((res) => {
                                aruga.reply(from, `تم اعادة تعيين رابط المجموعة`, id);
                            })
                            .catch((err) => {
                                console.log(`[ERR] ${err}`);
                            });
                    }
                    break;
      

        case 'kpop':
            if (args.length == 0) return aruga.reply(from, `Untuk menggunakan ${prefix}kpop\nSilahkan ketik: ${prefix}kpop [query]\nContoh: ${prefix}kpop bts\n\nquery yang tersedia:\nblackpink, exo, bts`, id)
            if (args[0] == 'blackpink' || args[0] == 'exo' || args[0] == 'bts') {
                fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/' + args[0] + '.txt')
                .then(res => res.text())
                .then(body => {
                    let randomkpop = body.split('\n')
                    let randomkpopx = randomkpop[Math.floor(Math.random() * randomkpop.length)]
                    aruga.sendFileFromUrl(from, randomkpopx, '', 'ماركو العنقاء يسلم عليك يسطا🥺..', id)
                })
                .catch(() => {
                    aruga.reply(from, 'في غلط يسطا', id)
                })
            } else {
                aruga.reply(from, `Maaf query tidak tersedia. Silahkan ketik ${prefix}kpop untuk melihat list query`, id)
            }
            break

            case 'بروفايل':{
                const userid = sender.id
                const ban = banned.includes(userid)
                const blocked = await aruga.getBlockedIds()
                const isblocked = blocked.includes(userid)
                const ct = await aruga.getContact(userid)
                const isOnline = await aruga.isChatOnline(userid) ? '✔' : '❌'
                var sts = await aruga.getStatus(userid)
                const bio = sts
                const admins = groupAdmins.includes(userid) ? 'مشرف' : 'عضو'
                var found = false
                    Object.keys(pengirim).forEach((i) => {
                        if(pengirim[i].id == userid){
                            found = i
                        }
                    })
                var adm = admins
                if (ct == null) {
                    return await aruga.reply(from, 'رقم WhatsApp غير صالح [غير مسجل في WhatsApp]', id) 
                } else {
                const contact = ct.pushname
                const dp = await aruga.getProfilePicFromServer(userid)
                if (dp == undefined) {
                    var pfp = 'https://raw.githubusercontent.com/Gimenz/line-break/master/profil.jpg'
                    } else {
                    var pfp = dp
                    } 
                if (contact == undefined) {
                    var nama = 'لا يريد اظهار اسمه' 
                    } else {
                    var nama = contact
                    } 
                const caption = `*وصف شخصي* ✨\n\n \n\n● *🎩 الاسم :* ${nama}\n\n● *📮 الخبر :* ${bio.Status}\n\n● *🔖 رابط لرقمك  :* wa.me/${sender.id.replace('@c.us', '')}\n\n● *👑 الرتبة :* ${adm}\n\n● *📓 محظور  :* ${ban ? '✔' : '❌'}\n\n● *البوت لقمك بلوك :* ${isblocked ? '✔' : '❌'}\n\nالمطور: marco`
                aruga.sendFileFromUrl(from, pfp, 'dp.jpg', caption)
                }
                }
            break     
           
        case 'اعادة-منشن':
            if (args.length == 0) return aruga.reply(from, `اذ تبي اعيد رسالتك قل #اعادة-منشن كايدو اقوى وبس `, id)
            const wikip = body.slice(6)
            const wikis = await rugaapi.wiki(wikip)
            await aruga.reply(from, wikis, id)
            .catch(() => {
                aruga.reply(from, 'في غلط يسطا', id)
            })
            break


        
                     
case 'ytmp3':
    // silahkan kalian custom sendiri jika ada yang ingin diubah
            if (args.length == 0) return aruga.reply(from, `Untuk mendownload lagu dari youtube\n\nPenggunaan: ${prefix}ytmp3 [link yt]`, id)
              const linkmp3 = args[0].replace('https://youtu.be/','').replace('https://www.youtube.com/watch?v=','')
                rugaapi.ytmp3(`https://youtu.be/${linkmp3}`)
                .then(async(res) => {
				await aruga.sendFileFromUrl(from, `${res.thumb}`, '', `「 *YOUTUBE MP3* 」\n\n*Title :* ${res.title}\n*Size :* ${res.size}\n*Quality :* ${res.quality}\n\n*Setelah audio dikirim dimohon berteriشكرا*\n*Gak شكرا = Block!!*\n\n*_Sabar, marcoBot lagi ngirim audionya_*`, id)
				if (Number(res.size.split(' MB')[0] > 7)) return aruga.reply(from, 'Gagal, ukuran audio terlalu besar!\nMax 7mb!', id)
				const simpen2 = await fetch(res.link);
				const bufferan = await simpen2.buffer();
				await sleep(1000)
				await fs.writeFile('./media/play.mp3', bufferan)
				await aruga.sendFile(from, './media/play.mp3', '', '', id)
                      		.catch((err) => {
				aruga.reply(from, `URL ${linkmp3} Sudah pernah didownload sebelumnya, Link akan direset selama 30 menit`,id)
			 })
			})
    			break

        case 'tts':
            if (args.length == 0) return aruga.reply(from, `Mengubah teks menjadi sound (google voice)\nketik: ${prefix}tts <kode_bahasa> <teks>\ncontoh : ${prefix}tts id halo\nuntuk kode bahasa cek disini : https://anotepad.com/note/read/5xqahdy8`, id)
            const ttsGB = require('node-gtts')(args[0])
            const dataText = body.slice(8)
                if (dataText === '') return aruga.reply(from, 'apa teksnya ngab..', id)
                try {
                    ttsGB.save('./media/tts.mp3', dataText, function () {
                    aruga.sendPtt(from, './media/tts.mp3', id)
                    })
                } catch (err) {
                    aruga.reply(from, err, id)
                }
            break
       		case 'covidindo':
			rugaapi.covidindo()
			.then(async (res) => {
				await aruga.reply(from, `${res} `, id)
			})
			break

 case 'اعكس-الكلمة':
			if (args.length == 0) return aruga.reply(from, `قم بكتابة شي ما لاقوم بكتابته بالعكس\n\nمثال ${prefix}اعكس-الكلمة كاتاكوري`, id)
			rugaapi.back(body.slice(10))
			.then(async(res) => {
				await aruga.reply(from, `${res}`, id)
			})
			break
 case 'عدد-الحروف':
			if (args.length == 0) return aruga.reply(from, `قم بكتابة شي ما لاحسب عدد الحروف\n\nمثال ${prefix}عدد-الحروف كاتاكوري`, id)
			rugaapi.huruf(body.slice(13))
			.then(async(res) => {
				await aruga.reply(from, `${res}`, id)
			})
			break
		


            case 'سرعة':
                const loadedMsg = await aruga.getAmountOfLoadedMessages()
                const chatIds = await aruga.getAllChatIds()
                const groups = await aruga.getAllGroups()
                const timestamp = سرعة();
                const latensi = سرعة() - timestamp
                const charged = await aruga.getIsPlugged();
                const device = await aruga.getMe() 
                const deviceinfo = `- مستوى البطارية : ${device.battery}%\n  ├ قيد الشحن: ${charged}\n  └ 24 ساعات على الإنترنت: ${device.is24h}\n  ├ إصدار نظام التشغيل : ${device.phone.os_version}\n  └ اكمل العدد : ${device.phone.os_build_number}\n\n _*Jam :*_ ${moment(t * 1000).format('HH:mm:ss')}`
                aruga.sendText(from, `*معلومات الجهاز*\n${deviceinfo}\n\nاستخدام ذاكرة الوصول العشوائي: *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*\nCPU: *${os.cpus().length}*\n\nStatus :\n- *${loadedMsg}*الرسائل المحملة\n- *${groups.length}* الدردشات الجماعية\n- *10376* الدردشات الشخصية\n- *${chatIds.length}* إجمالي الدردشات\n\nسرعة: ${latensi.toFixed(4)} _ثانية_`)
                break
 case 'سرعة2': {
            const loadedMsg = await aruga.getAmountOfLoadedMessages()
            const charged = await aruga.getIsPlugged();
            const device = await aruga.getMe() 
            const deviceinfo = `- مستوى البطارية : ${device.battery}%\n  ├ قيد الشحن: ${charged}\n  └ 24 ساعات على الإنترنت: ${device.is24h}\n  ├ إصدار نظام التشغيل : ${device.phone.os_version}\n  └ اكمل العدد : ${device.phone.os_build_number}\n\n _*Jam :*_ ${moment(t * 1000).format('HH:mm:ss')}`   
            const chatIds = await aruga.getAllChatIds()
            const groups = await aruga.getAllGroups()
            const groupsIn = groups.filter(x => x.groupMetadata.participants.map(x => [botNumber, '6282139549692@c.us'].includes(x.id._serialized)).includes(true))
            aruga.sendText(from, `*معلومات الجهاز*\n${deviceinfo}\n\nStatus :\n- *${loadedMsg}*الرسائل المحملة\n- *${groupsIn.length}* Group Joined\n- *${groups.length - groupsIn.length}* Groups Left\n- *${groups.length}* الدردشات الجماعية\n- *10376* الدردشات الشخصية\n- *10353* الدردشات الشخصية \n- *${chatIds.length}* إجمالي الدردشات\n- *${chatIds.length - groupsIn.length}* إجمالي الدردشات نشيط`)
 }           
break
   	case 'ملصق-عشوائي':
	  aruga.reply(from, mess.wait, id)
	const giffo = ['https://c.tenor.com/wgX4i8giG9wAAAAj/mochi-peachcat-cat.gif','https://c.tenor.com/UUhe2fIowxAAAAAj/love-mochi.gif','https://media.tenor.com/images/800a46ca3a946f908b8a5c7cd2eabe35/tenor.gif','https://media.tenor.com/images/ebb65bb0ca7bdd155c198a066ecfcb92/tenor.gif','https://media.tenor.com/images/75b3c8eca95d917c650cd574b91db7f7/tenor.gif','https://media.tenor.com/images/492a250e5ac486d298ec88e71079eeb1/tenor.gif','https://media.tenor.com/images/6321fa6690d59b2f37c25ce0d271cb6c/tenor.gif','https://media.tenor.com/images/ec85a866a451e1a47008ac6a8534d1c4/tenor.gif','https://media.tenor.com/images/73b6bc522e27fcc81fcdbf7012bdd323/tenor.gif','https://media.tenor.com/images/e411846cebbe99eb56e42a4d188cf5ca/tenor.gif','https://media.tenor.com/images/b418cde4ddb9ed4a8548500048d3bafb/tenor.gif','https://media.tenor.com/images/a13ada2790e7e128cd87958c9d166073/tenor.gif','https://media.tenor.com/images/f2f20ce49f0ecc1c3315c146e737bdc9/tenor.gif','https://media.tenor.com/images/23bfa35425bcd3794bea802adb5b9bfc/tenor.gif','https://media.tenor.com/images/eafc0f0bef6d6fd135908eaba24393ac/tenor.gif','https://media.tenor.com/images/d4173fe821ee176f5077ba98d7cdf417/tenor.gif','https://media.tenor.com/images/9164f10a0dbbf7cdb6aeb46184b16365/tenor.gif','https://media.tenor.com/images/3a9d2bd1bde9ed8ea02b2222988be6da/tenor.gif','https://media.tenor.com/images/fae2bbbba0be4db589e47dac43e266f9/tenor.gif','https://media.tenor.com/images/f599d464f0041f9899f8ec41a8e280ac/tenor.gif','https://media.tenor.com/images/8d94e004d553aa9edbb38c823454e421/tenor.gif','https://media.tenor.com/images/269250f1277adbbdafff69f2595ece0c/tenor.gif','https://media.tenor.com/images/558ebbab68370c33c69517b341c3f627/tenor.gif']
	let giffok = giffo[Math.floor(Math.random() * giffo.length)]
		  aruga.sendStickerfromUrl(from, giffok)
		   break
case 'كتابة.يسار':
		if (args.length == 0) return aruga.reply(from, `اجعل البوت يرسل كتابه يسار الدفتر`, id)
		const nulisfol1 = body.slice(11)
		const folkir = `https://api.xteam.xyz/magernulis4?text=${nulisfol1}&APIKEY=test`
		await aruga.sendFileFromUrl(from, `${folkir}`, 'img.jpg', 'تفضل هذا ما طلبته و اتمنى لك يوما سعيدا 😘🍒', id)
		.catch(err => {
		aruga.reply(from, 'Error!', id)
	})
	break 
case 'كتابة.يمين':
		if (args.length == 0) return aruga.reply(from, ` اجعل البوت يرسل كتابه يمين الدفتر`, id)
		const folkan = body.slice(12)
		const folkan2 = `https://api.xteam.xyz/magernulis5?text=${folkan}&APIKEY=test`
		await aruga.sendFileFromUrl(from, folkan2, 'img.jpg', 'تفضل هذا ما طلبته و اتمنى لك يوما سعيدا 😘🍒', id)
		.catch(err => {
			aruga.reply(from, 'Error', id)
		})
	break
case 'كتابة':
            if (args.length == 0) return aruga.reply(from, `يرجى كتابة هذا الامر مع نص بالانجليزي ليتم ارسال صوره مع النص في ورقه \n هكذا : ${prefix}كتابة [النص]\n\nمثال توضيح: ${prefix}كتابة i love you 3000`, id)
            const nulisq7 = body.slice(7)
            const nulisp7 = await rugaapi.nulis7(nulisq7)
            await aruga.sendImage(from, `${nulisp7}`, '', 'تفضل هذا ما طلبته و اتمنى لك يوما سعيدا 😘🍒', id)
            .catch(() => {
                aruga.reply(from, 'عذرا هناك حطا  يرجى كتابه نص بالانجليزي', id)
            })
            break
 case 'ستيكر':
           if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await aruga.sendImageAsSticker(from, imageBase64)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await aruga.sendImageAsSticker(from, imageBase64)
            } else if (args.length === 2) {
                const url = args[1]
                if (url.match(isUrl)) {
                    await client.sendStickerfromUrl(from, url, { method: 'get' })
                        .catch(err => console.log('Caught exception: ', err))
                } else {
                    aruga.reply(from, mess.error.Iv, id)
                }
            } else {
                    aruga.reply(from, mess.error.St, id)
            }
            break
 case 'ستيكر2':
			   if (args.length == 0) return aruga.reply(from, 'أرسل رابطًا لعمل ملصق بدون خلفيه ', id)
			   axios.get(`https://api.vhtear.com/removebgwithurl?link=${body.slice(10)}&apikey=${vhtearkey}`).then(res => {
			const jmtu = res.data.result
			aruga.sendFileFromUrl(from, jmtu.image, '', '', id)
			aruga.sendImageAsSticker(from, jmtu.image)
			.catch(() => {
			aruga.reply(from, 'Error', id)
			})
		    })
		break


        case 'صور_العرض':
            if (!isOwnerB) return aruga.reply(from, `لا يمكن استخدام هذا الأمر إلا من قبل المالك Bot!`, id)
            if (isMedia) {
                const mediaData = await decryptMedia(message)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await aruga.setProfilePic(imageBase64)
                aruga.sendTextWithMentions(`شكرا @${sender.id.replace('@c.us','')} صورة فوتوغرافية Profilenye..`)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await aruga.setProfilePic(imageBase64)
                aruga.sendTextWithMentions(from, `شكرا @${sender.id.replace('@c.us','')} صورة فوتوغرافية Profilenya 😘`)
            } else {
                aruga.reply(from, `تنسيق خاطئ!\n⚠️ الرجاء إرسال الصورة باستخدام ${prefix}صور_العرض`, id)
            }
            break

            case 'اختصار':
if (args.length == 0) return aruga.reply(from, ` هذا الامر ان اقوم باختصار رابط لك مثال : ${prefix}اختصار https://google.com`, id)
rugaapi.cuttly(body.slice(8))
.then(async(res) => {
    const cuttly = `*الرابط المختصر :* ${res.result} `
    aruga.reply(from, cuttly, id)
})
.catch(() => {
    aruga.reply(from, 'Errorr...', id)
})
break
case 'ownerbot':
case 'owner':
    await aruga.sendContact(from, ownerNumber)
    .then(() => aruga.sendText(from, 'silahkan yang mau chat nomer owner'))
    break
    case 'maps':

    rugaapi.maps()
    .then(async (res) => {
        await aruga.reply(from, `${res}`, id)
    })
    break
    case 'كشف-رابط':
        if (!isGroupMsg) return aruga.reply(from, 'عذرًا ، لا يمكن استخدام هذا الأمر إلا داخل المجموعة!', id)
        if (!isGroupAdmins) return aruga.reply(from, 'فشل ، لا يمكن استخدام هذا الأمر إلا من قبل مشرفين المجموعة!', id)
        if (!isBotGroupAdmins) return aruga.reply(from, 'أيها المشرف ، اجعلني مدير المجموعة أولاً:)', id)
        if (args[0] == 'قفل') {
            var cek = antilink.includes(chatId);
            if(cek){
                return aruga.reply(from, '* كاشف الروابط * نشط بالفعل في هذه المجموعة', id) //if number already exists on database
            } else {
                antilink.push(chatId)
                fs.writeFileSync('./lib/helper/antilink.json', JSON.stringify(antilink))
                aruga.reply(from, '* [كاشف الروابط] * تم تفعيله\nكل عضو في المجموعة يرسل رسالة تحتوي على رابط مجموعة سوف يطرده الروبوت!', id)
            }
        } else if (args[0] == 'فتح') {
            var cek = antilink.includes(chatId);
            if(!cek){
                return aruga.reply(from, '*Anti Group Link Detector* sudah non-aktif di grup ini', id) //if number already exists on database
            } else {
                let nixx = antilink.indexOf(chatId)
                antilink.splice(nixx, 1)
                fs.writeFileSync('./lib/helper/antilink.json', JSON.stringify(antilink))
                aruga.reply(from, '* تم تعطيل [كاشف الروابط] *\n', id)
            }
        } else {
            aruga.reply(from, `* [كاشف الروابط] * تم ايقافه*\nكل عضو في المجموعة يرسل رسالة تحتوي على رابط مجموعة سوف يطرده الروبوت!`, id)
        }
        break  


case 'صمم-رابط':
case 'wa':
    if (isGroupMsg) return aruga.reply(from , 'الامر خاص فقط' , id)
            await aruga.reply(from, `*هذا هو اللينك الخاص بك  ${pushname}*\n\n*wa.me/${sender.id.replace(/[@c.us]/g, '')}*\n\n*او*\n\n*api.whatsapp.com/send?phone=${sender.id.replace(/[@c.us]/g, '')}*\n\nby: ماركو العنقاء`, id)
            break 
 case 'يوزر':
            if (args.length == 0) return aruga.reply(from, `للبحث عن ملف انستاجرام شخصي\nهكذا ${prefix}يوزر [الاسم]\nمثال: ${prefix}يوزر xand_17`, id)
            const igstalk = await rugaapi.stalkig(args[0])
            const igstalkpict = await rugaapi.stalkigpict(args[0])
            await aruga.sendFileFromUrl(from, igstalkpict, '', igstalk, id)
            .catch(() => {
                aruga.reply(from, 'في حاجه غلط يسطا', id)
            })
            break
            case 'join':
                //return client.reply(from, 'Jika ingin meng-invite bot ke group anda, silahkan izin ke wa.me/6285892766102', id)
                if (args.length < 2) return aruga.reply(from, 'أرسل الأمر *#join linkgroup key*\n\nمثال:\n#join https://chat.whatsapp.com/blablablablablabla ', id)
                const link = args[1]
                const key = args[2]
                const tGr = await aruga.getAllGroups()
                const minMem = 180
                const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
                if (key !== 'CCA') return aruga.reply(from, '*key* salah! silahkan chat owner bot unruk mendapatkan key yang valid', id)
                const check = await aruga.inviteInfo(link)
                if (!isLink) return aruga.reply(from, 'Ini link? 👊🤬', id)
                if (tGr.length > 15) return aruga.reply(from, 'Maaf jumlah group sudah maksimal!', id)
                if (check.size < minMem) return client.reply(from, 'Member group tidak melebihi 30, bot tidak bisa masuk', id)
                if (check.status === 200) {
                    await aruga.joinGroupViaLink(link).then(() => client.reply(from, 'Bot akan segera masuk!'))
                } else {
                    aruga.reply(from, 'Link group tidak valid!', id)
                }
                break
case 'مراسلة':
		aruga.reply(from, mess , id)
		const reporter = body.slice(11)
		await aruga.sendText(ownerNumber, `هذه رسالة من احد مستخدمين البوت \n\n : *${pushname}*\n\nالمشكله : \n\n *${reporter}*`)
		aruga.reply(from, ' تم ارسال الملاحظة ل صاحب البوت', id)
		break




        // Group Commands (group admin only)
	    case 'اضافة':
            if (!isGroupMsg) return aruga.reply(from, 'عذرًا ، لا يمكن استخدام هذا الأمر إلا داخل المجموعة!', id)
            if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'فشل ، لا يمكن استخدام هذا الأمر إلا من قبل مشرفين المجموعة!', id)
            if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, kalo mau pake fitur ini, jadiin gua admin', id)
	        if (args.length !== 1) return aruga.reply(from, `Untuk menggunakan ${prefix}add\nPenggunaan: ${prefix}add <nomor>\ncontoh: ${prefix}add 628xxx`, id)
                try {
                    await aruga.addParticipant(from,`${args[0]}@c.us`)
                } catch {
                    aruga.reply(from, 'Target hilang diradar, Enemies Ahead!', id)
                }
            break
        case 'طرد':
            if (!isGroupMsg) return aruga.reply(from, 'عذرًا ، لا يمكن استخدام هذا الأمر إلا داخل المجموعة!', id)
            if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'فشل ، ستعمل هذه الميزة إذا استخدمها المسؤول', id)
            if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, kalo mau pake fitur ini, jadiin gw admin', id)
            if (mentionedJidList.length === 0) return aruga.reply(from, 'Maaf, format pesan salah.\nSilahkan tag satu atau lebih orang yang akan dikeluarkan', id)
            if (mentionedJidList[0] === botNumber) return await aruga.reply(from, 'Maaf, format pesan salah.\nTidak dapat mengeluarkan akun bot sendiri', id)
            await aruga.sendTextWithMentions(from, `Done!, mengeluarkan ${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return await aruga.sendText(from, 'tititttt admin tidak bisa di kick!')
                await aruga.removeParticipant(groupId, mentionedJidList[i])
            }
            break
            case 'ترقية':
                if (!isGroupMsg) return aruga.reply(from, 'عذرًا ، لا يمكن استخدام هذا الأمر إلا داخل المجموعة!', id)
                if (!isGroupAdmins) return aruga.reply(from, 'فشل ، ستعمل هذه الميزة إذا استخدمها المسؤول', id)
                if (!isBotGroupAdmins && !isOwnerB) return aruga.reply(from, 'فشل ، إذا كنت أرغب في استخدام هذه الميزة اجعلني مشرف', id)
                if (mentionedJidList.length !== 1) return aruga.reply(from, 'Maaf, hanya bisa mempromote 1 user', id)
                if (groupAdmins.includes(mentionedJidList[0])) return await aruga.reply(from, 'GOBLOG, tuh anak udah jadi admin bego.', id)
                if (mentionedJidList[0] === botNumber) return await aruga.reply(from, 'Maaf, format pesan salah.\nTidak dapat mempromote akun bot sendiri', id)
                await aruga.promoteParticipant(groupId, mentionedJidList[0])
                await aruga.sendTextWithMentions(from, `Done, ciee, @${mentionedJidList[0].replace('@c.us', '')} Jadi admin`)
                break
            case 'تخفيض':
                if (!isGroupMsg) return aruga.reply(from, 'عذرًا ، لا يمكن استخدام هذا الأمر إلا داخل المجموعة!', id)
                if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'فشل ، ستعمل هذه الميزة إذا استخدمها المسؤول', id)
                if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, kalo mau pake fitur ini, jadiin gw admin', id)
                if (mentionedJidList.length !== 1) return aruga.reply(from, 'عذرًا ، يمكن إظهار مستخدم واحد فقط', id)
                if (!groupAdmins.includes(mentionedJidList[0])) return await aruga.reply(from, 'GOBLOG, tuh anak udah belom jadi admin mau lu demote. mana bisa tolol.', id)
                if (mentionedJidList[0] === botNumber) return await aruga.reply(from, 'Maaf, format pesan salah.\nTidak dapat mendemote akun bot sendiri', id)
                await aruga.demoteParticipant(groupId, mentionedJidList[0])
                await aruga.sendTextWithMentions(from, `Done,\n@${mentionedJidList[0].replace('@c.us', '')} Halo member baru..`)
                break
            case 'باي':
                if (!isGroupMsg) return aruga.reply(from, 'عذرًا ، لا يمكن استخدام هذا الأمر إلا داخل المجموعة!', id)
                if (!isGroupAdmins && !isOwnerB) return aruga.reply(from, 'فشل ، ستعمل هذه الميزة إذا استخدمها المسؤول', id)
                aruga.sendText(from, 'Jahat kelen sama aku... ( ⇀‸↼‶ )').then(() => aruga.leaveGroup(groupId))
                break
case 'del':
case 'حذف':
 if (!isGroupMsg) return aruga.reply(from, 'عذرًا ، لا يمكن استخدام هذا الأمر إلا داخل المجموعة!', id)
if (!isGroupAdmins & !isOwnerB) return aruga.reply(from, 'فشل ، لا يمكن استخدام هذا الأمر إلا من قبل مشرفين المجموعة!', id)
                        if (!quotedMsg) return aruga.reply(from, `Maaf, format pesan salah silahkan.\nReply pesan bot dengan caption ${prefix}del`, id)
                if (!quotedMsgObj.fromMe) return aruga.reply(from, `Maaf, format pesan salah silahkan.\nReply pesan bot dengan caption ${prefix}del`, id)
                aruga.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                break

        
        case 'طرد-رجوع':
            if (!isGroupMsg) return aruga.reply(from, 'لا يمكن استخدام هذه الميزة إلا في مجموعات', id)
    if (!isGroupAdmins & !isOwnerB) return aruga.reply(from, 'فشل ، لا يمكن استخدام هذا الأمر إلا من قبل مشرفين المجموعة!', id)
                      if (!isBotGroupAdmins) return aruga.reply(from, 'لا يمكن استخدام هذا الأمر إلا عندما يكون الروبوت مسؤولاً', id)
            if (mentionedJidList.length === 0) return aruga.reply(from, 'منشن شخص اطرده وارجعه بنفس الوقت | مثال #طرد-رجوع @شخص ما', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return aruga.reply(from, mess.error.Ki, id)
                if (ownerNumber.includes(mentionedJidList[i])) return aruga.reply(from, 'فعلت ذلك يسطا ما تقولي لفيو يسطا')
                await aruga.removeParticipant(groupId, mentionedJidList[i])
                await sleep(1000)
                await aruga.addParticipant(from,`${mentionedJidList}`)
            } 
            break
            
case 'منشن':
            if (!isGroupMsg) return aruga.reply(from, 'عذرًا ، لا يمكن استخدام هذا الأمر إلا داخل المجموعة!', id)
            if (!isGroupAdmins & !isOwnerB) return aruga.reply(from, 'فشل ، لا يمكن استخدام هذا الأمر إلا من قبل مشرفين المجموعة!', id)
            const textInfo = body.slice(8)
            const namagcnih = name
            const memchu = chat.groupMetadata.participants.length
            const groupMem = await aruga.getGroupMembers(groupId)
            let hehex = `اسم النقابة : *${namagcnih}*\n\nعدد الأعضاء : *${memchu}*\n\n╔❖•ೋ° 〘 ماركو العنقاء〙❖•ೋ° ╗
            \n\n`
            for (let i = 0; i < groupMem.length; i++) {
                hehex += '╠➥'
                hehex += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehex += '╚❖•ೋ° 〘منشن جماعي〙❖•ೋ° ╝'
            await aruga.sendTextWithMentions(from, `مستخدم المنشن : ${pushname}\n` + textInfo+ '\n\n' +hehex)
            break

case 'ميوت':
			if (!isGroupMsg) return aruga.reply(from, 'عذرًا ، لا يمكن استخدام هذا الأمر إلا داخل المجموعة!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'فشل ، لا يمكن استخدام هذا الأمر إلا من قبل مشرفين المجموعة!', id)
            if (!isBotGroupAdmins) return aruga.reply(from, 'فشل ، يرجى إضافة الروبوت كمسؤول المجموعة!', id)
			if (args.length !== 1) return aruga.reply(from, `لتغيير إعدادات الدردشة الجماعية بحيث يمكن للمسؤولين فقط الدردشة\n\nالاستخدام:\n${prefix}قيد التشغيل - تشفيل\n${prefix}إيقاف التشغيل - قفل`, id)
            if (args[0] == 'قفل') {
				aruga.setGroupToAdminsOnly(groupId, true).then(() => aruga.sendText(from, 'تم التغيير بنجاح حتى لا يتمكن جميع الأعضاء من الدردشة!'))
			} else if (args[0] == 'فتح') {
				aruga.setGroupToAdminsOnly(groupId, false).then(() => aruga.sendText(from, 'تم التغيير بنجاح حتى يتمكن جميع الأعضاء من الدردشة!'))
			} else {
				aruga.reply(from, `لتغيير إعدادات الدردشة الجماعية بحيث يمكن للمسؤولين فقط الدردشة. \N\n الاستخدام: \n${prefix}ميوت فتح --ميوت قفل`, id)
			}
			break

			
        //Owner Group
        case 'kickall': //mengeluarkan semua member
        if (!isGroupMsg) return aruga.reply(from, 'عذرًا ، لا يمكن استخدام هذا الأمر إلا داخل المجموعة!', id)
        let isOwner = chat.groupMetadata.owner == pengirim
        if (!isOwner) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai oleh owner grup!', id)
        if (!isBotGroupAdmins) return aruga.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
            const allMem = await aruga.getGroupMembers(groupId)
            for (let i = 0; i < allMem.length; i++) {
                if (groupAdmins.includes(allMem[i].id)) {

                } else {
                    await aruga.removeParticipant(groupId, allMem[i].id)
                }
            }
            aruga.reply(from, 'Success kick all member', id)
        break

        //Owner Bot
       case 'ban':
            if (!isOwnerBot) return aruga.reply(from, 'هذا الأمر مخصص فقط لماركو!', id)
            if (args.length == 0) return aruga.reply(from, `Untuk banned seseorang agar tidak bisa menggunakan commands\n\nCaranya ketik: \n${prefix}ban add 628xx --untuk mengaktifkan\n${prefix}ban del 628xx --untuk nonaktifkan\n\ncara cepat ban banyak digrup ketik:\n${prefix}ban @tag @tag @tag`, id)
            if (args[0] == 'add') {
                banned.push(args[1]+'@c.us')
                fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
                aruga.reply(from, 'Success banned target!')
            } else
            if (args[0] == 'del') {
                let xnxx = banned.indexOf(args[1]+'@c.us')
                banned.splice(xnxx,1)
                fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
                aruga.reply(from, 'Success unbanned target!', id)
            } else {
             for (let i = 0; i < mentionedJidList.length; i++) {
                banned.push(mentionedJidList[i])
                fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
                aruga.reply(from, 'Success ban target!', id)
                }
            }
            break
  
            case 'الوصف' :
                    if (!isGroupMsg) return aruga.reply(from, 'لا يمكن استخدام هذا الأمر إلا في مجموعات!', message.id)
                    var totalMem = chat.groupMetadata.participants.length
                    var desc = chat.groupMetadata.desc
                    var groupname = name
                    var timestp = chat.groupMetadata.creation
                    var date = moment(timestp * 1000).format('dddd, DD MMMM YYYY')
                    var time = moment(timestp * 1000).format('HH:mm:ss')
                    var ownerwoi = chat.groupMetadata.owner
                    var grplink = antilink.includes(chat.id)
                    var botadmin = isBotGroupAdmins ? 'مشرف' : 'عضو'
                    var grouppic = await aruga.getProfilePicFromServer(chat.id)
                    if (grouppic == undefined) {
                         var pfp = errorurl
                    } else {
                         var pfp = grouppic 
                    }
                    
                    await aruga.sendFileFromUrl(from, pfp, '  group.png', `
*╔═════❖°ೋ•❖═════╗*
*「وصف القروب」*
*➸ اسم القروب ✨ :
*${groupname}*

تأسست هذه المجموعة 
*${date}* 

الساعة 
*${time}*

 صاحب التأسيس 
 ${ownerwoi.replace('@c.us','')}

 •۵•━────<ʚĭɞ>────━•۵•


*➸ عدد الأعضاء 🧍‍♂️ : ${totalMem}*
*➸ كشف الروابط ⛔ : ${grplink ? 'مفتوح' : 'مقفل'}*
*➸ بوت القروب 🐤  : ${botadmin}*
*➸ الوصف* 
${desc}

•۵•━────<ʚĭɞ>────━•۵•


by: marco \n\n
*╚═════❖°ೋ•❖═════╝*
`
)


                    break

                    case 'سكرين': {
                        if (!isOwnerB) return await aruga.reply(from, 'لا يمكن استخدام هذه الميزة إلا من قبل مسؤولي الروبوت')
                        const snap = await aruga.getSnapshot()
                        aruga.sendImage(from, snap, 'snapshot.png', 'وهذا سكرين للمحادثات عندي')
                    }
                        break
            
                //  case 'زوجي':
                //     const whan = args.join(' ')
                //     const ans = kapan[Math.floor(Math.random() * (kapan.length))]
                //      if (!whan) aruga.reply(from, `⚠️ تنسيق خاطى.`)
                //      await aruga.sendText(from, `${ans} `)
                //      break
                     
                 case 'قيم':
                     const rating = args.join(' ')
                     const awr = rate[Math.floor(Math.random() * (rate.length))]
                     if (!rating) aruga.reply(from, `⚠️ تنسيق خاطى *${prefix}سوال2 كم مدى حبك لي.`, id)
                     await aruga.sendText(from, `السوال: *${rating}* \n\nالمستوى: ${awr} `)
                     break

                     case 'حكمة':
                             const whan = args.join(' ')
                    const ans = rrr[Math.floor(Math.random() * (rrr.length))]
                     if (!whan) aruga.reply(from, `⚠️ تنسيق خاطى.`)
                     await aruga.sendText(from, `${ans} `)
                     break

                  case 'سوال':
                    case 'سؤال':
 if (args.length == 0) return aruga.reply(from, `مثال #سوال هل تحبني؟`, id)
                     const bsk = args.join(' ')
                     const jbsk = bisakah[Math.floor(Math.random() * (bisakah.length))]
                     if (!bsk) aruga.reply(from, '⚠️تنسيق خاطى.')
                     await aruga.sendText(from, `السوال: *${bsk}* \n\nالاجابة: ${jbsk} `)
                     break

            case 'offban':
                let bened = `This is list of banned number\nTotal : ${banned.length}\n`
                for (let i of banned) {
                    bened += `➸ ${i.replace(/@c.us/g,'')}\n`
                }
                await aruga.reply(from, bened, id)
                break
            case 'انا':
case 'my':
 if (!isGroupMsg) return aruga.reply(from, 'هذا الامر فقط فالقروب !', id)
                if (isBanned) return false
                if (isGroupMsg) {
                    if (!quotedMsg) {
                    var pic = await aruga.getProfilePicFromServer(author)
                    var namae = pushname
                    var sts = await aruga.getStatus(author)
                    var adm = isGroupAdmins
                    const { Status } = sts
                    if (pic == undefined) {
                    var pfp = errorurl
                    } else {
                        var pfp = pic
                    } 
                    await aruga.sendFileFromUrl(from, pfp, 'pfp.jpg', `*الملف الشخصي* ✨️ \n\n◈ *الاسم: ${namae}*\n\n◈ *الحاله: ${Status}*\n\n◈ *مشرف مجموعه: ${adm}*\n\n ◈المطور ماركو\n`)
                 } else if (quotedMsg) {
                 var qmid = quotedMsgObj.sender.id
                 var pic = await aruga.getProfilePicFromServer(qmid)
                 var namae = quotedMsgObj.sender.name
                 var sts = await aruga.getStatus(qmid)
                 var adm = isGroupAdmins
                 const { Status } = sts
                  if (pic == undefined) {
                  var pfp = errorurl
                  } else {
                  var pfp = pic
                  } 
                  await aruga.sendFileFromUrl(from, pfp, 'pfp.jpg', `*الملف الشخصي* ✨️ \n\n◈ *الاسم: ${namae}*\n\n◈ *الحاله: ${Status}*\n\n◈ *مشرف مجموعه: ${adm}*\n\n ◈المطور ماركو\n`)
                }
                }
                break
        case 'المحظورين':
            let hih = `قائمة من تم حظرهم من استعمال البوت\nعددهم : ${blockNumber.length}\n`
            for (let i of blockNumber) {
                hih += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await aruga.reply(from, hih, id)
            break

          case 'bc':
            if (!isOwnerB) return aruga.reply(from, `Perintah ini hanya untuk Owner  Zeus`, id)
                bctxt = body.slice(4)
                txtbc = `〘 *marco BOT* 〙\n\n${bctxt}`
                const semuagrup = await aruga.getAllChatIds();
                if(quotedMsg && quotedMsg.type == 'image'){
                    const mediaData = await decryptMedia(quotedMsg)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    for(let grupnya of semuagrup){
                        var cekgrup = await aruga.getChatById(grupnya)
                        if(!cekgrup.isReadOnly) aruga.sendImage(grupnya, imageBase64, 'gambar.jpeg', txtbc)
                    }
                    aruga.reply('Broadcast sukses!')
                }else{
                    for(let grupnya of semuagrup){
                        var cekgrup = await aruga.getChatById(grupnya)
                        if(!cekgrup.isReadOnly && isMuted(grupnya)) aruga.sendText(grupnya, txtbc)
                    }
                            aruga.reply('Broadcast Success!')
                }
                break
            case 'leaveall': //mengeluarkan bot dari semua group serta menghapus chatnya
            if (!isOwnerB) return aruga.reply(from, 'هذا الأمر مخصص فقط لماركو', id)
            const allChatso = await aruga.getAllChatIds()
            const loadedx = await aruga.getAmountOfLoadedMessages()
            const allGroupq = await aruga.getAllGroups()
            for (let gclist of allGroupq) {
                await aruga.sendText(gclist.contact.id, `آسف القارب ينظف,\n- إجمالي الدردشات النشطة : *${allChatso.length}*\n-الرسائل المحملة : *${loadedx}*\n\nيرجى دعوة الروبوت مرة أخرى إذا لزم الأمر`)
                await aruga.leaveGroup(gclist.contact.id)
                await aruga.deleteChat(gclist.contact.id)
            }
            aruga.reply(from, 'النجاح يترك كل مجموعة!', id)
            break
        case 'clearall': //menghapus seluruh pesan diakun bot
            if (!isOwnerBot) return aruga.reply(from, 'هذا الأمر مخصص فقط لماركو', id)
            const allChatx = await aruga.getAllChats()
            for (let dchat of allChatx) {
                await aruga.deleteChat(dchat.id)
            }
            aruga.reply(from, 'Success clear all chat!', id)
            break
        default:
            break
        case 'منشن-المشرفين':
            if (!isGroupMsg) return aruga.reply(from, 'لا يمكن استخدام هذا الأمر إلا في مجموعات!', id)
            let mimin = ''
            for (let admon of groupAdmins) {
                mimin += `➸ @${admon.replace(/@c.us/g, '')}\n` 
            }
            await aruga.sendTextWithMentions(from, mimin)
            break
        case 'عدد-الاعضاء':
            if (!isGroupMsg) return aruga.reply(from, 'لا يمكن استخدام هذا الأمر إلا في المجموعات')
            const tulul = name
            const yaelah = chat.groupMetadata.participants.length
                await aruga.sendText(from, `عدد جميع اعضاء قروب *${tulul}* هو : *${yaelah}*\n\nالمطور: marco` )
                break
        case 'الموسس':
            case 'المؤسس':
            if (!isGroupMsg) return aruga.reply(from, 'لا يمكن استخدام هذا الأمر إلا في مجموعات!', id)
            const Owner_ = chat.groupMetadata.owner
            await aruga.sendTextWithMentions(from, `مؤسس القروب هو : @${Owner_}`)
            break
        }
		
		// Simi-simi function
		if ((!isCmd && isGroupMsg && isSimi) && message.type === 'chat') {
			axios.get(`https://arugaz.herokuapp.com/api/simisimi?kata=${encodeURIComponent(message.body)}&apikey=${apiSimi}`)
			.then((res) => {
				if (res.data.Status == 403) return aruga.sendText(ownerNumber, `${res.data.result}\n\n${res.data.pesan}`)
				aruga.reply(from, `Simi berkata: ${res.data.result}`, id)
			})
			.catch((err) => {
				aruga.reply(from, `${err}`, id)
			})
		}
		
		// Kata kasar function
		if(!isCmd && isGroupMsg && isNgegas) {
            const find = db.get('group').find({ id: groupId }).value()
            if(find && find.id === groupId){
                const cekuser = db.get('group').filter({id: groupId}).map('members').value()[0]
                const isIn = inArray(pengirim, cekuser)
                if(cekuser && isIn !== false){
                    if(isKasar){
                        const denda = db.get('group').filter({id: groupId}).map('members['+isIn+']').find({ id: pengirim }).update('denda', n => n + 5000).write()
                        if(denda){
                            await aruga.reply(from, "Jangan badword bodoh\nDenda +5.000\nTotal : Rp"+formatin(denda.denda), id)
                        }
                    }
                } else {
                    const cekMember = db.get('group').filter({id: groupId}).map('members').value()[0]
                    if(cekMember.length === 0){
                        if(isKasar){
                            db.get('group').find({ id: groupId }).set('members', [{id: pengirim, denda: 5000}]).write()
                        } else {
                            db.get('group').find({ id: groupId }).set('members', [{id: pengirim, denda: 0}]).write()
                        }
                    } else {
                        const cekuser = db.get('group').filter({id: groupId}).map('members').value()[0]
                        if(isKasar){
                            cekuser.push({id: pengirim, denda: 5000})
                            await aruga.reply(from, "Jangan badword bodoh\nDenda +5.000", id)
                        } else {
                            cekuser.push({id: pengirim, denda: 0})
                        }
                        db.get('group').find({ id: groupId }).set('members', cekuser).write()
                    }
                }
            } else {
                if(isKasar){
                    db.get('group').push({ id: groupId, members: [{id: pengirim, denda: 5000}] }).write()
                    await aruga.reply(from, "Jangan badword bodoh\nDenda +5.000\nTotal : Rp5.000", id)
                } else {
                    db.get('group').push({ id: groupId, members: [{id: pengirim, denda: 0}] }).write()
                }
            }
        }
    } catch (err) {
        console.log(color('[EROR]', 'red'), err)
    }
}
