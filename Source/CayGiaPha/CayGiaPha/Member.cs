//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CayGiaPha
{
    using System;
    using System.Collections.Generic;
    
    public partial class Member
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Job { get; set; }
        public string AddressID { get; set; }
        public Nullable<int> Memberold { get; set; }
        public Nullable<int> TypeRelationship { get; set; }
        public Nullable<System.DateTime> Date_Create { get; set; }
        public Nullable<System.DateTime> Birthday { get; set; }
        public Nullable<System.DateTime> DateOfDeath { get; set; }
        public Nullable<int> BirthPlaceId { get; set; }
        public Nullable<int> BurialPlaceId { get; set; }
        public Nullable<int> CauseOfDeath { get; set; }
        public Nullable<int> TreeID { get; set; }
    }
}
