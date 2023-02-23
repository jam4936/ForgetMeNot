const DeleteMedia = {

    deleteMediaById : async function(id : string) {
        console.log(id)
        let temp = await fetch("https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/media/" + id, {method: 'DELETE'}).then(result => result.json())
        console.log(temp)
    },
};
export default DeleteMedia;
