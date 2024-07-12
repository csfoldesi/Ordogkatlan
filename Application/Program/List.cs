using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Program;

public class List
{
    public class Query : IRequest<List<ProgramListItemDTO>> { }

    public class Handler : IRequestHandler<Query, List<ProgramListItemDTO>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public Handler(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<List<ProgramListItemDTO>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var query = _dataContext.TimeTables
                .ProjectTo<ProgramListItemDTO>(_mapper.ConfigurationProvider)
                .AsQueryable();

            return await query.ToListAsync();
        }
    }
}
