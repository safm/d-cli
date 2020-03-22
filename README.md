# d-cli

A basic command line utility using commander

# To get started

```bash
npm ci
node index -h
```

## Some of the support commands

```bash
# check version of this program
node index -V

# to get more help regarding a particular command
# for example if you need to get more information about the `ls` command
node index help ls

# diff between two files. files test1.txt & test2.txt is included in the repo
node index diff file1.txt file2.txt

# list all files for a given path
node index ls .

# list all files along with the type & size for a given path
node index ls . -l

# order a MacBook Pro 16". It will ask you for all the options.
node index order
```
