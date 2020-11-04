
export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id == folderId)

export const findNote = (notes=[], noteId) => {
  return notes.find(note => {
    return note.id === noteId
  })
}

export const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folder_id == folderId)
)


export const countNotesForFolder = (notes=[], folderId) =>{
  return notes.filter(note => note.folder_id == folderId).length
}

