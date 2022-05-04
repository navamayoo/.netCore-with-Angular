using NewsApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewsApi.Repository
{
    public class NoteSqlRepository : INoteRepository
    {
        private readonly NoteDbContext dbContext;

        public NoteSqlRepository(NoteDbContext context)
        {
            this.dbContext = context;
        }

        public Note CreateNote(Note note)
        {
            try
            {
                dbContext.Notes.Add(note);
                dbContext.SaveChanges();
                return note;
            }
            catch (Exception)
            {

                throw;
            }
 
        }

        public Note DeleteNote(int id)
        {
            try
            {
                Note note = dbContext.Notes.Find(id);
                if (note != null)
                {
                    dbContext.Notes.Remove(note);
                    dbContext.SaveChanges();
                }
                return note;
            }
            catch (Exception)
            {

                throw;
            }

        }

        public IEnumerable<Note> GetAllNotes()
        {
            return dbContext.Notes;
        }

        public Note GetNoteById(int id)
        {
            return dbContext.Notes.Find(id);
        }

        public Note UpdateNote(Note note, int id)
        {
            try
            {
                if (id != note.noteId)
                {
                    throw new ArgumentException("Notes method not found for specified id.");
                }
                var _note = dbContext.Notes.Attach(note);
                _note.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                dbContext.SaveChanges();
                return note;
            }
            catch (Exception)
            {

                throw;
            }




        }

 
    }
}
