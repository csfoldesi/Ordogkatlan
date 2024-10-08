﻿using Application.Program.DTO;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<TimeTable, ProgramListItemDTO>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Program.Id))
            .ForMember(d => d.PerformanceId, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.Date, o => o.MapFrom(s => s.StartTime!.Value.Date))
            .ForMember(d => d.Title, o => o.MapFrom(s => s.Program.Title))
            .ForMember(d => d.Description, o => o.MapFrom(s => s.Program.Description))
            .ForMember(d => d.Thumbnail, o => o.MapFrom(s => s.Program.Thumbnail))
            .ForMember(d => d.StageId, o => o.MapFrom(s => s.Stage.Id))
            .ForMember(d => d.StageName, o => o.MapFrom(s => s.Stage.Name))
            .ForMember(d => d.VillageId, o => o.MapFrom(s => s.Stage.Village.Id))
            .ForMember(d => d.VillageName, o => o.MapFrom(s => s.Stage.Village.Name))
            .ForMember(d => d.IsTicketed, o => o.MapFrom(s => s.Program.IsTicketed))
            .ForMember(d => d.Genres, o => o.MapFrom(s => s.Program.Genres));

        CreateMap<Genre, GenreDTO>();
    }
}
