
// test api 
const urlBase="https://challenge-paola.firebaseio.com/";
// Produccion
// const urlBase = "url api produccion aqui mero";
//bucket images
export  var uploadUrl=`${urlBase}locailizacion del bucket de imagenes`
export var tokenConekta={};
var tokenId = ""

export function setToken(tokenId){
    tokenId;
}


export async function post(data,model){
    let getAct = await fetch(urlBase+`/${model}.json`,{
        method:"POST",
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
    })
    try{
        let data = await getAct.json()
        return data
    }catch(err){
        return err
    }  
}

export async function getFilter(nameVar, value, model, all, id){
    let getAct = await fetch(urlBase+`/${model}${id ? `/${id}.json` : !all ? `.json?orderBy="${nameVar}"&equalTo="${value}"&print=pretty` : ".json"}`,{
        method:"GET",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json; charset=utf-8'
        },
    })
    let data = await getAct
    console.log(data)
    if(!data.error && data){
      return data.json()
    }else{
        return false
    }   
}

export async function patch ( model, id, formData) {
    var getAct
    if(id){
        getAct = await fetch(urlBase +`/${model}/${id}.json` , {
            headers:{
                'Content-Type': 'application/json'
            },
            method: "PATCH",
            body: JSON.stringify( formData )
        })
    }else{
        getAct = await fetch(urlBase +`/${model}.json` , {
            headers:{
                'Content-Type': 'application/json'
            },
            method: "PATCH",
            body: JSON.stringify( formData )
        }) 
    }
    let data = await getAct
    console.log(data)
    if(data){
      return data.json()
    }else{
        return false
    } 
}

export async function functionDelete(model, id) {
    let getAct = await fetch(urlBase +`/${model}/${id}.json` , {
        headers:{
            'Content-Type': 'application/json'
        },
        method: "DELETE",
    })
    let data = await getAct
    console.log(data)
    if(data){
        return data.json()
    }else{
        return false
    } 
}
