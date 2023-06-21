import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { GithubAuthGuard } from './utils/Guard';
import { Request, Response } from 'express';
import { Octokit } from 'octokit';

@Controller('auth')
export class AuthController {

    @Get('github/login')
    @UseGuards(GithubAuthGuard)
    handleLogin() {
        return {msg: 'Authentication started'}
    }

    @Get('github/callback')
    @UseGuards(GithubAuthGuard)
    handleRedirect(@Res() response: Response) {
        console.log('OK callback done.')
        response.redirect('/');
    }
    

    @Get('status')
    // @UseGuards(GithubAuthGuard)
    handleit(@Req() request: Request) {

        console.log(request.user);
        if (request.user) {
            const { username } = request.user as any;
            return { msg: 'Authenticated', username};
        } else {
            return { msg: 'Not Authenticated' };
        }

    }

    @Get('repo')
    // @UseGuards(GithubAuthGuard)
    async createRepoWithFiles(@Req() request: Request) {
      const { token } = request.user as any;
      const octokit = new Octokit({ auth: token });
  
      try {
        // Create a new repository
        const repoName = 'new-sample-repo';
        const { data: createdRepo } = await octokit.rest.repos.createForAuthenticatedUser({
          name: repoName,
        });
  
        // Create text files in the repository
        const file1Content = 'Hello, world!';
        const file2Content = 'This is a sample text file.';
        const { data: file1 } = await octokit.rest.repos.createOrUpdateFileContents({
          owner: createdRepo.owner.login,
          repo: repoName,
          path: 'file1.txt',
          message: 'Create file1.txt',
          content: Buffer.from(file1Content).toString('base64'),
        });
        const { data: file2 } = await octokit.rest.repos.createOrUpdateFileContents({
          owner: createdRepo.owner.login,
          repo: repoName,
          path: 'file2.txt',
          message: 'Create file2.txt',
          content: Buffer.from(file2Content).toString('base64'),
        });
  
        return {
          message: 'Repository created with files',
          repository: createdRepo,
          files: [file1, file2],
        };
      } catch (error) {
        // Handle any errors that occur during repository creation
        console.error('Error creating repository:', error);
        return { error: 'Failed to create repository' };
      }
    }

}
