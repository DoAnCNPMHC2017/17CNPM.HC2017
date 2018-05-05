using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CayGiaPha.Models
{
    public class DSMember
    {
         public int ID {get;set;}
         public string FullName {get;set;}
         public int Generation { get; set; } 
         public string Sex {get;set;}
         public int Memberold {get;set;}
         public DateTime Birthday {get;set;}
         public string Fa {get;set;}
         public string Mo { get; set; }
         public string bd { get; set; }
    }
    public class DataCreate
    {
        public int TreeID {get;set;}
        public string FName{get;set;}
        public string DChi{get;set;}
        public string GTinh{get;set;}
        public int VLam{get;set;}
        public string MBOld{get;set;}
        public int QHe{get;set;}
        public DateTime NSinh { get; set; }
        public int NoiSinh{get;set;}
        public DateTime CDate { get; set; }
        
    }
    public class Couple
    {
        public int ID1 { get; set; }
        public string Sex1 { get; set; }
        public int ID2 { get; set; }
        public string Sex2 { get; set; }
    }
    public class ReportTG
    {
        public Int64 STT { get; set; }
        public Int32 Nam { get; set; }
        public Int32 SlS { get; set; }
        public Int32 SlKH { get; set; }
        public Int32 SlMT { get; set; }
    }
    public class ReportTC
    {
        public Int64 STT { get; set; }
        public string TenTT { get; set; }
        public Int32 Sl { get; set; }
    }
}