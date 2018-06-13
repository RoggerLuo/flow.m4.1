export default function(str){
    try {
        if(/\n/g.test(str)) {
            str = str.replace(/\n/g, `<br>`)
        }
    }
    catch(err){
        console.log(err)
        return str
    }
    return str
}
