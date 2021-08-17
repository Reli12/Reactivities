using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {

            //we need sorce from where we map to destination 
            CreateMap<Activity, Activity>();
        }
    }
}