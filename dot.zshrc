# dot.zshrc

# origin:   mollifier's 少し凝った zshrc
# license:  MIT license

autoload -Uz colors
colors

fpath=($HOME/.zsh/Completion(N-/) $fpath)
fpath=($HOME/.zsh/functions/*(N-/) $fpath)
fpath=(/usr/local/share/zsh/site-functions(N-/) $fpath) # Mac homebrew

autoload -Uz compinit
compinit

bindkey -e

HISTFILE=~/.zsh_history
HISTSIZE=2048
SAVEHIST=2048

PROMPT="%{${fg[green]}%}%n%{${reset_color}%}@%{${fg[red]}%}%m%{${reset_color}%}: %~ %# "

autoload -Uz select-word-style
select-word-style default

zstyle ':zle:*' word-chars " /=;@:{},|"
zstyle ':zle:*' word-style unspecified

# sudo completion
zstyle ':completion:*:sudo:*' command-path /usr/local/sbin /usr/local/bin \
/usr/sbin /usr/bin /sbin /bin /usr/X11R6/bin

# process name completion (kill <Tab>)
zstyle ':completion:*:processes' command 'ps x -o pid,s,args'

# vcs_info
autoload -Uz vcs_info
autoload -Uz add-zsh-hook

zstyle ':vcs_info:*' formats "%F{green}(%s)-[%b]%f"
zstyle ':vcs_info:*' actionformats "%F{red}(%s)-[%b|%a]%f"

function _update_vcs_info_msg() {
    LANG=en_US.UTF-8 vcs_info
    RPROMPT="${vcs_info_msg_0_}"
}
add-zsh-hook precmd _update_vcs_info_msg

# options
setopt print_eight_bit
setopt no_beep
setopt no_flow_control
setopt interactive_comments
setopt auto_cd
setopt auto_pushd
setopt pushd_ignore_dups
setopt share_history
setopt hist_ignore_all_dups
setopt hist_ignore_space
setopt hist_reduce_blanks
setopt extended_glob

# history
bindkey '^R' history-incremental-pattern-search-backward

# alias
alias ll='ls -l'

# ls binding
case ${OSTYPE} in
    darwin*) # Mac OS
    export CLICOLOR=1
    alias ls='ls -G -F'
    ;;
    linux*) # Linux
    alias ls='ls -F --color=auto'
    ;;
esac
