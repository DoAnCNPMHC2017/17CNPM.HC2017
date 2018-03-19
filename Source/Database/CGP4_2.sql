use CGP
GO
update Job SET TreeID =1
GO
update CauseOfDeath  SET TreeID =1
GO
Update BirthPlace SET TreeID =1
GO
select * from Member
Update Member
Set FullName= N'Nguyễn Văn A',
Job=4,
AddressID =N'TP.HCM',
Memberold = NULL,
TypeRelationship=1,
Date_Create = '2018-03-06 18:51:20.857',
Birthday='2005-07-15 09:30:49.000',
DateOfDeath=NULL,
BirthPlaceId = 4,
BurialPlaceId = NULL,
CauseOfDeath = NULL,
TreeID =1,
Sex = 'M'
WHERE ID = 1
GO
Update Member
Set FullName= N'Nguyễn Quốc Thiên Tâm',
Job=3,
AddressID =N'TP.HCM',
Memberold = 1,
TypeRelationship=0,
Date_Create = '2018-03-06 19:04:15.077',
Birthday='2018-03-06 19:03:49.000',
DateOfDeath=NULL,
BirthPlaceId = 5,
BurialPlaceId = NULL,
CauseOfDeath = NULL,
TreeID =1,
Sex = 'M'
WHERE ID = 2
GO
Update Member
Set FullName= N'Nguyễn Hải Hoàng Cường',
Job=2,
AddressID =N'TP.HCM',
Memberold = 1,
TypeRelationship=0,
Date_Create = '2018-03-06 20:12:36.850',
Birthday='1990-09-06 09:50:07.000',
DateOfDeath=NULL,
BirthPlaceId = 5,
BurialPlaceId = NULL,
CauseOfDeath = NULL,
TreeID =1,
Sex = 'M'
WHERE ID = 3
GO
INSERT INTO Member(FullName,Job,AddressID,Memberold,TypeRelationship,Date_Create,Birthday,DateOfDeath,BirthPlaceId,BurialPlaceId,CauseOfDeath,TreeID,Sex)
VALUES(N'Nguyễn Thị Liễu',2,'TP.HCM',NULL,1,'2018-03-06 18:51:20.857','2005-07-15 09:30:49.000',NULL,4,NULL,NULL,1,'F')