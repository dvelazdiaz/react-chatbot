export function validateRequire(value) {
  let result = value.replace(/ /g,'')
  if(result != "") {
    return false
  }

  return {error: true, message: "Este campo é obrigatório"}
}

export function validateEmail(value) {
  let rex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  let result = rex.test(value)
  if(result) {
    return false
  }

  return {error: true, message: "Por favor digite um email válido"}
}

export function validateNumber(value) {
  let rex = /^\d+$/
  let result = rex.test(value)
  if(result) {
    return false
  }

  return {error: true, message: "Por favor digite um número válido"}
}

export function validateCustom(value, rex) {
  let result = rex.test(value)
  if(result) {
    return false
  }

  return {error: true, message: "Formato inválido"}
}
