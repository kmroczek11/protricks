import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { LogInResponse } from 'src/auth/responses/logIn-response';
import { Role } from 'src/users/entities/role.enum';
import { RefreshTokenResponse } from './dto/refresh-token-response';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { TokensService } from './tokens.service';

@Resolver()
export class TokensResolver {
  constructor(private tokensService: TokensService) {}

  @Mutation(() => RefreshTokenResponse)
  @Public()
  refreshToken(
    @Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput,
  ): Promise<RefreshTokenResponse> {
    return this.tokensService.refreshToken(refreshTokenInput);
  }
}
