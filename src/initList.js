
import(/* webpackChunkName: "notesComponent" */ 'components/list/Notes').then(Notes => {
    debugger
    // Model.change('list','component',Notes.default)
    // console.log(list)
    
}).catch(error => 'An error occurred while loading the componentNotes')

