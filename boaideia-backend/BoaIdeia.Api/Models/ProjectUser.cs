using BoaIdeia.Api.Constants;
using BoaIdeia.Api.ValueObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoaIdeia.Api.Models
{
    public class ProjectUser
    {
        public long IdProject { get;  set; }
        public Project Project { get;  set; }
        public long IdUser { get;  set; }
        public User User { get;  set; }

        private string _typePermission;
        public string TypePermission { 
            get { return _typePermission; } 
            set {
                if (TypesOfPermissions.List.Contains(value))
                    _typePermission = value;
                else
                    throw new ArgumentException("Informe um tipo de permissão válido");
            } 
        }
        public DateTime EntryDate { get; /*  */ set; }
        public DateTime? DepartureDate { get;  set; }

        protected ProjectUser() { }
        public ProjectUser(long idUser, string typePermission)
        {
            IdUser = idUser;
            TypePermission = typePermission;
            EntryDate = DateTime.Now.Date;
        }

        public ProjectUser(User user, string typePermission)
        {
            User = user;
            TypePermission = typePermission;
            EntryDate = DateTime.Now.Date;
        }

        public ProjectUser(string typePermission)
        {
            TypePermission = typePermission;
            EntryDate = DateTime.Now.Date;
        }

        public bool HasAccess() => TypesOfPermissions.List.Contains(_typePermission);
        public bool IsOwner() => TypesOfPermissions.Owner == TypePermission;
    }

  
}
