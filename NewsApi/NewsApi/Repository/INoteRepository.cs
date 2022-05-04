using NewsApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewsApi.Repository
{
    public interface INoteRepository
    {
        IEnumerable<Note> GetAllNotes();
        Note GetNoteById(int id);
        Note CreateNote(Note note);
        Note UpdateNote(Note note, int id);
        Note DeleteNote(int id);
    }
}
